import { memo, useCallback } from 'react';
import { Flex } from '@/shared/ui/Flex';
import { CommentCard } from '../CommentCard/CommentCard';
import {
	useDeleteCommentMutation,
	useFetchCommentsQuery,
} from '../../api/commentApi';
import { Spinner } from '@/shared/ui/Spinner';
import { Text } from '@/shared/ui/Text';
import { useTranslation } from 'react-i18next';

interface ICommentListProps {
	postId: string;
	userId: string;
}

export const CommentList = memo((props: ICommentListProps) => {
	const { postId, userId } = props;
	const { t } = useTranslation('profile');
	const {
		data: comments,
		isLoading,
		error,
	} = useFetchCommentsQuery({ postId });
	const [onDeleteComment, { isLoading: deleteLoading }] =
		useDeleteCommentMutation();

	const onDeleteCommentHandle = useCallback(
		(commentId: string) => {
			onDeleteComment({ commentId });
		},
		[onDeleteComment],
	);

	if (isLoading) {
		return (
			<Flex width="100%" height="100px" justify="center" align="center">
				<Spinner theme="invert" />
			</Flex>
		);
	}

	if (error) {
		return (
			<Flex width="100%" height="100px" justify="center" align="center">
				<Text
					theme="error"
					text={t('Something went wrong')}
					textAlign="center"
					size="l"
				/>
			</Flex>
		);
	}

	return (
		<Flex direction="column" gap="16">
			{comments?.map((comment) => {
				return (
					<CommentCard
						key={comment.id}
						comment={comment}
						admin={userId === comment.author.id}
						deleteLoading={deleteLoading}
						onDeleteComment={onDeleteCommentHandle}
					/>
				);
			})}
		</Flex>
	);
});
