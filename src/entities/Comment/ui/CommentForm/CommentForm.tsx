import { memo, useCallback } from 'react';
import { FormWithImg } from '@/shared/ui/FormWithImg';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getCommentState } from '../../model/selectors/commentSelectors';
import { useAddCommentMutation } from '../../api/commentApi';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import {
	commentActions,
	commentReducer,
} from '../../model/selectors/commentSlice';
import { DynamicModuleLoader } from '@/shared/components';

interface ICommentFormProps {
	userId: string;
	postId: string;
}

export const CommentForm = memo((props: ICommentFormProps) => {
	const { postId, userId } = props;
	const { t } = useTranslation('profile');
	const { text } = useSelector(getCommentState);
	const dispatch = useAppDispatch();
	const [onAddComment, { isLoading, isSuccess }] = useAddCommentMutation();

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
				isLoading={isLoading}
				onSubmit={onSubmit}
			/>
		</DynamicModuleLoader>
	);
});
