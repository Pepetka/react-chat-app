import { memo, useCallback, useEffect, useState } from 'react';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import LikeIcon from '@/shared/assets/like2.svg';
import DislikeIcon from '@/shared/assets/dislike.svg';
import CommentIcon from '@/shared/assets/comment.svg';
import SpeakerIcon from '@/shared/assets/speaker.svg';
import SuccessIcon from '@/shared/assets/check.svg';
import MoreIcon from '@/shared/assets/more.svg';
import { Post } from '../../model/types/postSchema';
import { useTranslation } from 'react-i18next';
import { AppImg } from '@/shared/ui/AppImg';
import { Spinner } from '@/shared/ui/Spinner';
import { getProfilePagePath } from '@/shared/const/router';
import { AppLink } from '@/shared/ui/AppLink';
import { useFetchPostStatsQuery } from '../../api/postApi';
import { CommentForm, CommentList } from '@/entities/Comment';
import { Menu } from '@/shared/ui/Menu';
import { Carousel } from '@/widgets/Carousel';

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
	} = props;
	const [success, setSuccess] = useState(false);
	const [openComments, setOpenComments] = useState(openCommentsDefault);
	const { t } = useTranslation('profile');
	const { data: postStats } = useFetchPostStatsQuery({
		postId: post.id,
		userId,
	});

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
				<Flex justify="space-between">
					<AppLink href={getProfilePagePath(post.author.id)}>
						<Flex align="center" gap="8" width="auto">
							<Avatar size="m" circle img={post.author.avatar} />
							<Text
								text={`${post.author.firstname} ${post.author.lastname}`}
								size="l"
								theme="primary-invert"
							/>
						</Flex>
					</AppLink>
					{admin && (
						<Menu
							width="64px"
							height="64px"
							trigger={<Icon SvgIcon={MoreIcon} invert />}
						>
							<Button
								onClick={onDeletePostHandle}
								theme="clear"
								width="100%"
								height="100%"
							>
								{deleteLoading ? '...' : t('Delete')}
							</Button>
						</Menu>
					)}
				</Flex>
				<Flex justify="space-between">
					<Text size="m" width="50%" text={post.text} theme="primary-invert" />
					{post.img && (
						<Flex width="385px">
							<Carousel>
								{post.img.map((src, index) => (
									<AppImg
										key={index}
										width="385px"
										height="385px"
										src={src}
										alt={t('Post image')}
										fallback={<Spinner />}
										errorFallback={
											<Text
												text={t('Something went wrong')}
												size="l"
												textAlign="center"
											/>
										}
									/>
								))}
							</Carousel>
						</Flex>
					)}
				</Flex>
				<Flex align="flex-end" justify="space-between">
					<Text text={post.createdAt} theme="secondary-invert" />
					<Flex gap="24" align="center" width="auto">
						<Flex gap="8" align="center" width="auto">
							<Text
								width="auto"
								text={postStats?.comments ?? '0'}
								textAlign="right"
								theme="primary-invert"
								size="l"
							/>
							<Button
								onClick={onToggleComments}
								invert={openComments}
								width="64px"
								height="64px"
							>
								<Icon SvgIcon={CommentIcon} invert={!openComments} />
							</Button>
						</Flex>
						<Flex gap="8" align="center" width="auto">
							<Text
								width="auto"
								text={postStats?.likes ?? '0'}
								textAlign="right"
								theme="primary-invert"
								size="l"
							/>
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
							<Text
								width="auto"
								text={postStats?.dislikes ?? '0'}
								textAlign="right"
								theme="primary-invert"
								size="l"
							/>
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
							<Text
								width="auto"
								text={postStats?.shared ?? '0'}
								textAlign="right"
								theme="primary-invert"
								size="l"
							/>
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
				{openComments && (
					<>
						<Text title={t('Comments')} theme="primary-invert" size="l" />
						<CommentForm postId={post.id} userId={userId} />
						<CommentList postId={post.id} userId={userId} />
					</>
				)}
			</Flex>
		</Card>
	);
});
