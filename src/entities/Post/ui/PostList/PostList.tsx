import { memo, ReactNode, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { Card } from '@/shared/ui/Card';
import {
	useDeletePostMutation,
	useDislikePostMutation,
	useLazyFetchPostsDataQuery,
	useLikePostMutation,
	useSharePostMutation,
} from '../../api/postApi';
import { PostCardSkeleton } from '../PostCardSkeleton/PostCardSkeleton';
import { PostCard } from '../PostCard/PostCard';
import { Post } from '../../model/types/postSchema';

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
	const [page, setPage] = useState(0);
	const [posts, setPosts] = useState<Array<Post>>([]);
	const { t } = useTranslation('profile');
	const [loadMore, { data: postsData, isFetching: isLoading, error }] =
		useLazyFetchPostsDataQuery();
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

	const onLoadMore = useCallback(() => {
		if (postsData?.endReached || isLoading) return;

		loadMore({ profileId, page, limit: 10 });
		setPage((prev) => prev + 1);
	}, [isLoading, loadMore, page, postsData?.endReached, profileId]);

	useEffect(() => {
		onLoadMore();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (postsData?.posts) {
			setPosts((posts) => [...posts, ...postsData.posts]);
		}
	}, [postsData?.posts]);

	if (isLoading) {
		return (
			<Flex data-testid="PostList.skeleton" direction="column" gap="40">
				<PostCardSkeleton admin={userId === profileId} />
				<PostCardSkeleton admin={userId === profileId} />
				<PostCardSkeleton admin={userId === profileId} />
			</Flex>
		);
	}

	if (error) {
		return (
			<Card data-testid="PostList.error" width="100%" height="300px">
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
		<Virtuoso
			customScrollParent={
				document.querySelector('[data-scroll]') as HTMLElement
			}
			data={posts}
			overscan={{ main: 10, reverse: 10 }}
			endReached={onLoadMore}
			components={{
				Footer: () => (
					<>
						{!!isLoading && (
							<div style={{ marginTop: '40px' }}>
								<Flex direction="column" gap="40">
									{new Array(10).fill(0).map((_, index) => (
										<PostCardSkeleton
											admin={userId === profileId}
											key={index}
										/>
									))}
								</Flex>
							</div>
						)}
					</>
				),
			}}
			itemContent={(index, post) => (
				<div
					style={{
						paddingBottom: index + 1 !== posts.length ? '40px' : '0',
					}}
				>
					<PostCard
						data-testid={`PostList.card.${post.id}`}
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
				</div>
			)}
		/>
	);
});
