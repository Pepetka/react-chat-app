import { memo, useCallback } from 'react';
import { FormWithImg } from '@/shared/ui/FormWithImg';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getCommentState } from '../../model/selectors/commentSelectors';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { commentActions, commentReducer } from '../../model/slice/commentSlice';
import { DynamicModuleLoader } from '@/shared/components';

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
}

export const CommentForm = memo((props: ICommentFormProps) => {
	const { postId, userId, addLoading, isSuccess, onAddComment } = props;
	const { t } = useTranslation('profile');
	const { text } = useSelector(getCommentState);
	const dispatch = useAppDispatch();

	const onChangeText = useCallback(
		(text: string) => {
			dispatch(commentActions.setText(text));
		},
		[dispatch],
	);

	const onSubmit = useCallback(() => {
		if (text.trim()) {
			onAddComment({ postId, authorId: userId, text });
			dispatch(commentActions.clear());
		}
	}, [dispatch, onAddComment, postId, text, userId]);

	return (
		<DynamicModuleLoader reducerKey="comment" reducer={commentReducer}>
			<FormWithImg
				withImg={false}
				textPlaceholder={t('Write your comment')}
				textValue={text}
				onChangeText={onChangeText}
				isSuccess={isSuccess}
				isLoading={addLoading}
				onSubmit={onSubmit}
			/>
		</DynamicModuleLoader>
	);
});
