import { memo, useCallback, useState } from 'react';
import { Flex } from '@/shared/ui/Flex';
import { PostCard } from '@/entities/Post';
import {
	useDeletePostMutation,
	useDislikePostMutation,
	useFetchPostsDataQuery,
	useLikePostMutation,
	useSharePostMutation,
} from '../../api/postApi';
import { Spinner } from '@/shared/ui/Spinner';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/Text';
import { Card } from '@/shared/ui/Card';

interface IPostListProps {
	userId: string;
	profileId: string;
}

export const PostList = memo((props: IPostListProps) => {
	const { userId, profileId } = props;
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
			onDeletePost({ postId, userId });
		},
		[onDeletePost, userId],
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
				<Card width="100%" height="300px">
					<Flex width="100%" height="100%" justify="center" align="center">
						<Spinner theme="invert" />
					</Flex>
				</Card>
				<Card width="100%" height="300px">
					<Flex width="100%" height="100%" justify="center" align="center">
						<Spinner theme="invert" />
					</Flex>
				</Card>
				<Card width="100%" height="300px">
					<Flex width="100%" height="100%" justify="center" align="center">
						<Spinner theme="invert" />
					</Flex>
				</Card>
			</Flex>
		);
	}

	if (error) {
		return (
			<Card width="100%" height="300px">
				<Text text={t('Something went wrong')} textAlign="center" size="xl" />
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
					admin={userId === profileId}
					userId={userId}
					post={post}
				/>
			))}
		</Flex>
	);
});
