import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { Comment } from '@/shared/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';
import { CommentCardSkeleton } from '../CommentCardSkeleton/CommentCardSkeleton';

interface ICommentListProps {
	postId: string;
	userId: string;
	skeletonNum?: number;
	comments?: Array<Comment>;
	isLoading: boolean;
	isError: boolean;
	onDeleteComment?: ({
		commentId,
		postId,
	}: {
		commentId: string;
		postId: string;
	}) => void;
	deleteLoading: boolean;
	'data-testid'?: string;
}

export const CommentList = memo((props: ICommentListProps) => {
	const {
		postId,
		userId,
		skeletonNum,
		comments,
		deleteLoading,
		isError,
		isLoading,
		onDeleteComment,
		'data-testid': dataTestId,
	} = props;
	const { t } = useTranslation('profile');

	const onDeleteCommentHandle = useCallback(
		(commentId: string) => {
			onDeleteComment?.({ commentId, postId });
		},
		[onDeleteComment, postId],
	);

	if (isError) {
		return (
			<Flex
				data-testid={`${dataTestId}.error`}
				width="100%"
				height="100px"
				justify="center"
				align="center"
			>
				<Text
					theme="error"
					text={t('Something went wrong')}
					textAlign="center"
					size="l"
				/>
			</Flex>
		);
	}

	if (isLoading || !comments) {
		return (
			<Flex data-testid={`${dataTestId}.skeleton`} direction="column" gap="16">
				{new Array(skeletonNum ?? 3).fill(0).map((_, index) => (
					<CommentCardSkeleton key={index} admin={false} />
				))}
			</Flex>
		);
	}

	return (
		<Flex direction="column" gap="16">
			{comments?.map((comment) => {
				return (
					<CommentCard
						data-testid={`${dataTestId}.card.${comment.id}`}
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
