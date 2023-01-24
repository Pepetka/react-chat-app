import { memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { SendWithImgForm } from '@/widgets/SendWithImgForm';
import { DynamicModuleLoader } from '@/shared/components';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { postActions, postReducer } from '../../model/slice/postSlice';
import { getPostState } from '../../model/selectors/postSelectors';
import { useAddPostMutation } from '../../api/postApi';
import { getUserAuthData } from '@/entities/User';

export const PostForm = memo(() => {
	const { img, text } = useSelector(getPostState);
	const authData = useSelector(getUserAuthData);
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
		onAddPost({ text, img, authorId: authData?.id ?? '' });
		dispatch(postActions.clear());
	}, [authData?.id, dispatch, img, onAddPost, text]);

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
