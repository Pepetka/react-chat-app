import { memo, ReactNode, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { Card } from '@/shared/ui/Card';
import {
	useDeletePostMutation,
	useDislikePostMutation,
	useFetchPostsDataQuery,
	useLikePostMutation,
	useSharePostMutation,
} from '../../api/postApi';
import { PostCardSkeleton } from '../PostCardSkeleton/PostCardSkeleton';
import { PostCard } from '../PostCard/PostCard';

interface IPostListProps {
	userId: string;
	profileId: string;
	admin: boolean;
	commentList?: (props: {
		postId: string;
		userId: string;
		commentsNum: number;
	}) => ReactNode;
}

export const PostList = memo((props: IPostListProps) => {
	const { userId, profileId, commentList, admin } = props;
	const [postId, setPostId] = useState('');
	const { t } = useTranslation('profile');
	const {
		data: posts,
		isFetching: isLoading,
		error,
	} = useFetchPostsDataQuery(
		{ profileId },
		{ refetchOnMountOrArgChange: true },
	);
	const [onDeletePost, { isLoading: deleteLoading }] = useDeletePostMutation();
	const [onSharePost, { isLoading: shareLoading, isSuccess: shareSuccess }] =
		useSharePostMutation();
	const [onLikePost, { isLoading: likeLoading }] = useLikePostMutation();
	const [onDislikePost, { isLoading: dislikeLoading }] =
		useDislikePostMutation();

	const onDeletePostHandle = useCallback(
		(postId: string) => {
			onDeletePost({ postId, userId: profileId });
		},
		[onDeletePost, profileId],
	);

	const onSharePostHandle = useCallback(
		(postId: string) => {
			onSharePost({ postId, userId });
			setPostId(postId);
		},
		[onSharePost, userId],
	);

	const onLikePostHandle = useCallback(
		(postId: string) => {
			onLikePost({ postId, userId });
			setPostId(postId);
		},
		[onLikePost, userId],
	);

	const onDislikePostHandle = useCallback(
		(postId: string) => {
			onDislikePost({ postId, userId });
			setPostId(postId);
		},
		[onDislikePost, userId],
	);

	if (isLoading) {
		return (
			<Flex direction="column" gap="40">
				<PostCardSkeleton admin={userId === profileId} />
				<PostCardSkeleton admin={userId === profileId} />
				<PostCardSkeleton admin={userId === profileId} />
			</Flex>
		);
	}

	if (error) {
		return (
			<Card width="100%" height="300px">
				<Flex width="100%" height="100%" align="center">
					<Text
						theme="error"
						text={t('Something went wrong')}
						textAlign="center"
						size="l"
					/>
				</Flex>
			</Card>
		);
	}

	return (
		<Flex direction="column" gap="40">
			{posts?.map((post) => (
				<PostCard
					deleteLoading={postId === post.id && deleteLoading}
					shareLoading={postId === post.id && shareLoading}
					shareSuccess={postId === post.id && shareSuccess}
					onSharePost={onSharePostHandle}
					likeLoading={postId === post.id && likeLoading}
					onLikePost={onLikePostHandle}
					dislikeLoading={postId === post.id && dislikeLoading}
					onDislikePost={onDislikePostHandle}
					onDeletePost={onDeletePostHandle}
					key={post.id}
					admin={admin || userId === post.author.id}
					userId={userId}
					post={post}
					commentList={commentList}
				/>
			))}
		</Flex>
	);
});
