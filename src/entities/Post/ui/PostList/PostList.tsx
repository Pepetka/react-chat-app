import { memo } from 'react';
import { Flex } from '@/shared/ui/Flex';
import { PostCard } from '@/entities/Post';
import { Post } from '@/entities/Post/model/types/postSchema';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { useFetchPostsDataQuery } from '@/entities/Post/api/postApi';
import { Spinner } from '@/shared/ui/Spinner';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/Text';
import { Card } from '@/shared/ui/Card';

interface IPostListProps {
	userId: string;
}

export const PostList = memo((props: IPostListProps) => {
	const { userId } = props;
	const { t } = useTranslation('profile');
	const authData = useSelector(getUserAuthData);
	const { data: posts, isLoading, error } = useFetchPostsDataQuery({ userId });

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
			{posts!.map((post) => (
				<PostCard user={authData!} post={post} />
			))}
		</Flex>
	);
});
