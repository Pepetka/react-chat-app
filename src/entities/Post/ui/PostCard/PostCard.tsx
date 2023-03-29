import { memo, ReactNode, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
	} = props;
	const [success, setSuccess] = useState(false);
	const [openComments, setOpenComments] = useState(openCommentsDefault);
	const { t } = useTranslation('profile');
	const { data: postStats, isLoading } = useFetchPostStatsQuery({
		postId: post.id,
		userId,
	});
	const [isOpen, setIsOpen] = useState(false);

	const onOpenModal = useCallback(() => {
		setIsOpen(true);
	}, []);

	const onCloseModal = useCallback(() => {
		setIsOpen(false);
	}, []);

	useEffect(() => {
		let timerId: ReturnType<typeof setTimeout>;

		if (shareSuccess) {
			setSuccess(true);
			timerId = setTimeout(() => {
				setSuccess(false);
			}, 1000);
		}

		return () => {
			clearTimeout(timerId);
		};
	}, [shareSuccess]);

	const onToggleComments = useCallback(() => {
		setOpenComments((prev) => !prev);
	}, []);

	const onDeletePostHandle = useCallback(() => {
		onDeletePost?.(post.id);
	}, [onDeletePost, post.id]);

	const onSharePostHandle = useCallback(() => {
		onSharePost?.(post.id);
	}, [onSharePost, post.id]);

	const onLikePostHandle = useCallback(() => {
		onLikePost?.(post.id);
	}, [onLikePost, post.id]);

	const onDislikePostHandle = useCallback(() => {
		onDislikePost?.(post.id);
	}, [onDislikePost, post.id]);

	return (
		<Card width="100%">
			<Flex direction="column" gap="16">
				<>
					<Flex justify="space-between">
						<UserCard user={post.author} avatarSize="m" />
						{admin && (
							<Menu
								width="64px"
								height="64px"
								trigger={<Icon SvgIcon={MoreIcon} invert />}
							>
								<Button
									onClick={onDeletePostHandle}
									theme="clear"
									width="120px"
									height="48px"
								>
									{deleteLoading ? '...' : t('Delete')}
								</Button>
							</Menu>
						)}
					</Flex>
					<Flex justify="space-between">
						<Text
							size="m"
							width="50%"
							text={post.text}
							theme="primary-invert"
						/>
						{post.img && (
							<>
								<Carousel
									carouselWidth="385px"
									carouselHeight="385px"
									alt={t('Post image')}
									onImgClick={onOpenModal}
									imgArray={post.img}
								/>
								<Modal isOpen={isOpen} onCloseModal={onCloseModal}>
									<Carousel
										carouselWidth="700px"
										carouselHeight="700px"
										alt={t('Post image')}
										imgArray={post.img}
										customPaging
										keysNav
									/>
								</Modal>
							</>
						)}
					</Flex>
					<Flex align="flex-end" justify="space-between">
						<Text text={post.createdAt} theme="secondary-invert" />
						<Flex gap="24" align="center" width="auto">
							{commentList && (
								<Flex gap="8" align="center" width="auto">
									{isLoading ? (
										<Skeleton height="24px" width="50px" margin="4px" />
									) : (
										<Text
											width="50px"
											text={postStats?.comments ?? '0'}
											textAlign="right"
											theme="primary-invert"
											size="l"
										/>
									)}
									<Button
										onClick={onToggleComments}
										invert={openComments}
										width="64px"
										height="64px"
									>
										<Icon SvgIcon={CommentIcon} invert={!openComments} />
									</Button>
								</Flex>
							)}
							<Flex gap="8" align="center" width="auto">
								{isLoading ? (
									<Skeleton height="24px" width="50px" margin="4px" />
								) : (
									<Text
										width="50px"
										text={postStats?.likes ?? '0'}
										textAlign="right"
										theme="primary-invert"
										size="l"
									/>
								)}
								<Button
									onClick={onLikePostHandle}
									invert={postStats?.isLiked}
									disabled={likeLoading}
									width="64px"
									height="64px"
								>
									<Icon SvgIcon={LikeIcon} invert={!postStats?.isLiked} />
								</Button>
							</Flex>
							<Flex gap="8" align="center" width="auto">
								{isLoading ? (
									<Skeleton height="24px" width="50px" margin="4px" />
								) : (
									<Text
										width="50px"
										text={postStats?.dislikes ?? '0'}
										textAlign="right"
										theme="primary-invert"
										size="l"
									/>
								)}
								<Button
									onClick={onDislikePostHandle}
									invert={postStats?.isDisliked}
									disabled={dislikeLoading}
									width="64px"
									height="64px"
								>
									<Icon SvgIcon={DislikeIcon} invert={!postStats?.isDisliked} />
								</Button>
							</Flex>
							<Flex gap="8" align="center" width="auto">
								{isLoading ? (
									<Skeleton height="24px" width="50px" margin="4px" />
								) : (
									<Text
										width="50px"
										text={postStats?.shared ?? '0'}
										textAlign="right"
										theme="primary-invert"
										size="l"
									/>
								)}
								<Button
									onClick={!admin ? onSharePostHandle : undefined}
									invert={postStats?.isShared}
									disabled={shareLoading}
									width="64px"
									height="64px"
								>
									{shareLoading ? (
										'...'
									) : success ? (
										<Icon SvgIcon={SuccessIcon} invert={!postStats?.isShared} />
									) : (
										<Icon SvgIcon={SpeakerIcon} invert={!postStats?.isShared} />
									)}
								</Button>
							</Flex>
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
