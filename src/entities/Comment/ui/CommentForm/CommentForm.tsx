import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FormWithImg } from '@/shared/ui/FormWithImg';
import { DynamicModuleLoader } from '@/shared/components';
import { commentReducer } from '../../model/slice/commentSlice';

interface ICommentFormProps {
	userId: string;
	postId: string;
	onAddComment: ({
		postId,
		authorId,
		text,
	}: {
		postId: string;
		authorId: string;
		text: string;
	}) => void;
	addLoading: boolean;
	isSuccess: boolean;
	'data-testid'?: string;
}

export const CommentForm = memo((props: ICommentFormProps) => {
	const {
		postId,
		userId,
		addLoading,
		isSuccess,
		onAddComment,
		'data-testid': dataTestId,
	} = props;
	const { t } = useTranslation('profile');

	const onSubmit = useCallback(
		(data: { text?: string }) => {
			if (data.text) {
				onAddComment({ text: data.text, authorId: userId, postId });
			}
		},
		[onAddComment, postId, userId],
	);

	return (
		<DynamicModuleLoader reducerKey="comment" reducer={commentReducer}>
			<FormWithImg
				data-testid={`${dataTestId}.form`}
				withImg={false}
				textPlaceholder={t('Write your comment')}
				isSuccess={isSuccess}
				isLoading={addLoading}
				onSubmit={onSubmit}
			/>
		</DynamicModuleLoader>
	);
});
