import {
	FC,
	memo,
	ReactNode,
	SVGProps,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Menu } from '@/shared/ui/Menu';
import { Carousel } from '@/shared/ui/Carousel';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Modal } from '@/shared/ui/Modal';
import { UserCard } from '@/shared/ui/UserCard';
import LikeIcon from '@/shared/assets/like2.svg';
import DislikeIcon from '@/shared/assets/dislike.svg';
import CommentIcon from '@/shared/assets/comment.svg';
import SpeakerIcon from '@/shared/assets/speaker.svg';
import SuccessIcon from '@/shared/assets/check.svg';
import MoreIcon from '@/shared/assets/more.svg';
import { useFetchPostStatsQuery } from '../../api/postApi';
import { Post } from '../../model/types/postSchema';

interface IPostCardProps {
	post: Post;
	userId: string;
	deleteLoading?: boolean;
	shareLoading?: boolean;
	shareSuccess?: boolean;
	onSharePost?: (postId: string) => void;
	likeLoading?: boolean;
	onLikePost?: (postId: string) => void;
	dislikeLoading?: boolean;
	onDislikePost?: (postId: string) => void;
	onDeletePost?: (postId: string) => void;
	admin: boolean;
	openCommentsDefault?: boolean;
	commentList?: (props: {
		postId: string;
		userId: string;
		commentsNum: number;
	}) => ReactNode;
	'data-testid'?: string;
}

export const PostCard = memo((props: IPostCardProps) => {
	const {
		post,
		onDeletePost,
		admin,
		onSharePost,
		deleteLoading,
		shareLoading,
		shareSuccess,
		userId,
		dislikeLoading,
		likeLoading,
		onDislikePost,
		onLikePost,
		openCommentsDefault = false,
		commentList,
		'data-testid': dataTestId,
	} = props;
	const isDesktopOrLaptop = useMediaQuery({ minWidth: 1200 });
	const isSmallScreen = useMediaQuery({ maxWidth: 992 });
	const isSmallScreenHeight = useMediaQuery({ maxHeight: 992 });
	const isSmallestScreen = useMediaQuery({ maxWidth: 425 });
	const [success, setSuccess] = useState(false);
	const [openComments, setOpenComments] = useState(openCommentsDefault);
	const { t } = useTranslation('profile');
	const { data: postStats, isLoading } = useFetchPostStatsQuery(
		{
			postId: post.id,
			userId,
		},
		{ refetchOnMountOrArgChange: true },
	);
	const [isOpen, setIsOpen] = useState(false);
	const [isRerender, setIsRerender] = useState(false);

	const onOpenModal = useCallback(() => {
		setIsOpen(true);
	}, []);

	const onCloseModal = useCallback(() => {
		setIsOpen(false);
	}, []);

	useEffect(() => {
		setIsRerender(true);
	}, []);

	useEffect(() => {
		let timerId: ReturnType<typeof setTimeout>;

		if (shareSuccess && isRerender) {
			setSuccess(true);
			timerId = setTimeout(() => {
				setSuccess(false);
			}, 1000);
		}

		return () => {
			clearTimeout(timerId);
		};
		// eslint-disable-next-line
	}, [shareSuccess]);

	const onToggleComments = useCallback(() => {
		setOpenComments((prev) => !prev);
	}, []);

	const onDeletePostHandle = useCallback(() => {
		onDeletePost?.(post.id);
	}, [onDeletePost, post.id]);

	const onSharePostHandle = useCallback(() => {
		if (admin) return;

		onSharePost?.(post.id);
	}, [admin, onSharePost, post.id]);

	const onLikePostHandle = useCallback(() => {
		onLikePost?.(post.id);
	}, [onLikePost, post.id]);

	const onDislikePostHandle = useCallback(() => {
		onDislikePost?.(post.id);
	}, [onDislikePost, post.id]);

	const postButtons: Array<{
		name: string;
		num?: string;
		isPressed?: boolean;
		onClick?: () => void;
		icon: FC<SVGProps<SVGSVGElement>>;
		buttonDisabled?: boolean;
		condition: boolean;
	}> = useMemo(
		() => [
			{
				name: 'comments',
				num: postStats?.comments,
				onClick: onToggleComments,
				isPressed: openComments,
				icon: CommentIcon,
				condition: !!commentList,
			},
			{
				name: 'likes',
				num: postStats?.likes,
				onClick: onLikePostHandle,
				isPressed: postStats?.isLiked,
				icon: LikeIcon,
				buttonDisabled: likeLoading,
				condition: true,
			},
			{
				name: 'dislikes',
				num: postStats?.dislikes,
				onClick: onDislikePostHandle,
				isPressed: postStats?.isDisliked,
				icon: DislikeIcon,
				buttonDisabled: dislikeLoading,
				condition: true,
			},
			{
				name: 'shared',
				num: postStats?.shared,
				onClick: onSharePostHandle,
				isPressed: postStats?.isShared,
				icon: SpeakerIcon,
				buttonDisabled: shareLoading,
				condition: true,
			},
		],
		[
			commentList,
			dislikeLoading,
			likeLoading,
			onDislikePostHandle,
			onLikePostHandle,
			onSharePostHandle,
			onToggleComments,
			openComments,
			postStats?.comments,
			postStats?.dislikes,
			postStats?.isDisliked,
			postStats?.isLiked,
			postStats?.isShared,
			postStats?.likes,
			postStats?.shared,
			shareLoading,
		],
	);

	return (
		<Card data-testid={dataTestId} width="100%">
			<Flex direction="column" gap="16">
				<>
					<Flex justify="space-between">
						<UserCard
							id={post.author.id}
							name={post.author.name}
							avatar={post.author.avatar}
							avatarSize={isSmallScreen ? 's' : 'm'}
							textSize={isSmallScreen ? 'm' : 'l'}
						/>
						{admin && (
							<Menu
								width={isSmallScreen ? '40px' : '64px'}
								height={isSmallScreen ? '40px' : '64px'}
								trigger={<Icon SvgIcon={MoreIcon} invert />}
								direction="bottom_left"
							>
								<Button
									data-testid="PostCard.delete"
									aria-label="Delete post"
									onClick={onDeletePostHandle}
									theme="clear"
									width="100px"
									height="28px"
								>
									{deleteLoading ? '...' : t('Delete')}
								</Button>
							</Menu>
						)}
					</Flex>
					<Flex wrap="wrap" justify="space-between">
						<Text
							size="m"
							width={isSmallScreen ? '100%' : '50%'}
							text={post.text}
							theme="primary-invert"
						/>
						{!!post.img?.length && (
							<>
								<Carousel
									carouselWidth={isSmallestScreen ? '100%' : '385px'}
									carouselHeight="385px"
									alt={t('Post image')}
									onImgClick={onOpenModal}
									imgArray={post.img}
								/>
								<Modal isOpen={isOpen} onCloseModal={onCloseModal}>
									<Carousel
										carouselWidth="700px"
										carouselHeight="700px"
										full={isSmallScreen || isSmallScreenHeight}
										alt={t('Post image')}
										imgArray={post.img}
										customPaging
										keysNav
									/>
								</Modal>
							</>
						)}
					</Flex>
					<Flex
						direction={isDesktopOrLaptop ? 'row' : 'column'}
						align={isDesktopOrLaptop ? 'flex-end' : 'flex-start'}
						justify="space-between"
					>
						<Text text={post.createdAt} theme="secondary-invert" />
						<Flex
							gap="24"
							align="center"
							justify="center"
							width={isDesktopOrLaptop ? 'auto' : '100%'}
						>
							{postButtons.map(
								({
									name,
									condition,
									isPressed,
									num,
									onClick,
									icon,
									buttonDisabled,
								}) =>
									condition && (
										<Flex
											key={name}
											gap="8"
											align="center"
											width="auto"
											direction={isSmallScreen ? 'column' : 'row'}
										>
											{isLoading ? (
												<Skeleton height="24px" width="50px" margin="4px" />
											) : (
												<Text
													data-testid={`PostCard.${name}.number`}
													width="50px"
													text={num ?? '0'}
													textAlign={isSmallScreen ? 'center' : 'right'}
													theme="primary-invert"
													size="l"
												/>
											)}
											<Button
												data-testid={`PostCard.${name}.button`}
												aria-label={`Post ${name} button`}
												onClick={onClick}
												invert={isPressed}
												disabled={buttonDisabled}
												width={isSmallScreen ? '40px' : '64px'}
												height={isSmallScreen ? '40px' : '64px'}
											>
												{name !== 'shared' ? (
													<Icon SvgIcon={icon} invert={!isPressed} />
												) : (
													<>
														{shareLoading ? (
															'...'
														) : success ? (
															<Icon
																SvgIcon={SuccessIcon}
																invert={!postStats?.isShared}
															/>
														) : (
															<Icon
																SvgIcon={SpeakerIcon}
																invert={!postStats?.isShared}
															/>
														)}
													</>
												)}
											</Button>
										</Flex>
									),
							)}
						</Flex>
					</Flex>
					{openComments &&
						commentList &&
						commentList({
							postId: post.id,
							userId,
							commentsNum: postStats?.comments ? Number(postStats.comments) : 0,
						})}
				</>
			</Flex>
		</Card>
	);
});
