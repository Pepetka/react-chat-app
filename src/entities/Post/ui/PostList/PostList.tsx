import { memo, useCallback } from 'react';
import { Flex } from '@/shared/ui/Flex';
import { PostCard } from '@/entities/Post';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import {
	useDeletePostMutation,
	useFetchPostsDataQuery,
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
	const { t } = useTranslation('profile');
	const {
		data: posts,
		isLoading,
		error,
	} = useFetchPostsDataQuery({ profileId });
	const [onDeletePost] = useDeletePostMutation();

	const onDeletePostHandle = useCallback(
		(postId: string) => {
			onDeletePost({ postId, userId });
		},
		[onDeletePost, userId],
	);

	if (isLoading) {
		return (
			<Flex
				direction="column"
				gap="40"
				justify="center"
				align="center"
				height="300px"
			>
				<Spinner />
			</Flex>
		);
	}

	if (error) {
		return (
			<Card width="100%">
				<Text text={t('Something went wrong')} textAlign="center" size="xl" />
			</Card>
		);
	}

	return (
		<Flex direction="column" gap="40">
			{posts?.map((post) => (
				<PostCard
					onDeletePost={onDeletePostHandle}
					key={post.id}
					admin={userId === profileId}
					post={post}
				/>
			))}
		</Flex>
	);
});
