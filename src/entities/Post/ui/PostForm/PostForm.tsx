import { memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { SendWithImgForm } from '@/widgets/SendWithImgForm';
import { DynamicModuleLoader } from '@/shared/components';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { postActions, postReducer } from '../../model/slice/postSlice';
import { getPostState } from '../../model/selectors/postSelectors';
import { useAddPostMutation } from '../../api/postApi';

interface IPostFormProps {
	userId: string;
	profileId: string;
}

export const PostForm = memo((props: IPostFormProps) => {
	const { userId, profileId } = props;
	const { img, text } = useSelector(getPostState);
	const dispatch = useAppDispatch();
	const [onAddPost, { isLoading }] = useAddPostMutation();
	const { t } = useTranslation('profile');

	const { onChangeText, onChangeImg } = useMemo(
		() => ({
			onChangeText: (text: string) => {
				dispatch(postActions.setText(text));
			},
			onChangeImg: (img: string) => {
				dispatch(postActions.setImg(img));
			},
		}),
		[dispatch],
	);

	const onSubmit = useCallback(() => {
		onAddPost({ text, img, authorId: userId, profileId });
		dispatch(postActions.clear());
	}, [onAddPost, text, img, userId, profileId, dispatch]);

	return (
		<DynamicModuleLoader reducerKey="post" reducer={postReducer}>
			<SendWithImgForm
				textPlaceholder={t('Share your news')}
				imgPlaceholder={t('Add image')}
				imgValue={img}
				onChangeImg={onChangeImg}
				textValue={text}
				onChangeText={onChangeText}
				isLoading={isLoading}
				onSubmit={onSubmit}
			/>
		</DynamicModuleLoader>
	);
});
