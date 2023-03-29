import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { CommentForm, CommentList } from '@/entities/Comment';
import {
	useAddCommentMutation,
	useDeleteCommentMutation,
	useFetchCommentsQuery,
} from '../../api/postCommentsApi';

interface IPostCommentsProps {
	postId: string;
	userId: string;
	commentsNum: number;
}

export const PostComments = memo((props: IPostCommentsProps) => {
	const { postId, userId, commentsNum } = props;
	const { t } = useTranslation('profile');
	const {
		data: comments,
		isLoading,
		isError,
	} = useFetchCommentsQuery({ postId });
	const [onDeleteComment, { isLoading: deleteLoading }] =
		useDeleteCommentMutation();
	const [onAddComment, { isLoading: addLoading, isSuccess }] =
		useAddCommentMutation();

	return (
		<Flex direction="column" gap="16">
			<Text title={t('Comments')} theme="primary-invert" size="l" />
			<CommentForm
				postId={postId}
				userId={userId}
				onAddComment={onAddComment}
				addLoading={addLoading}
				isSuccess={isSuccess}
			/>
			<CommentList
				postId={postId}
				userId={userId}
				skeletonNum={commentsNum}
				comments={comments}
				isLoading={isLoading}
				isError={isError}
				onDeleteComment={onDeleteComment}
				deleteLoading={deleteLoading}
			/>
		</Flex>
	);
});
