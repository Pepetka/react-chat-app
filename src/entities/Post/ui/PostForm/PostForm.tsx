import { memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FormWithImg } from '@/shared/ui/FormWithImg';
import { DynamicModuleLoader } from '@/shared/components';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { postActions, postReducer } from '../../model/slice/postSlice';
import { getPostState } from '../../model/selectors/postSelectors';
import { useAddPostMutation } from '../../api/postApi';
import { Card } from '@/shared/ui/Card';

interface IPostFormProps {
	userId: string;
	profileId: string;
}

export const PostForm = memo((props: IPostFormProps) => {
	const { userId, profileId } = props;
	const { img, text } = useSelector(getPostState);
	const dispatch = useAppDispatch();
	const [onAddPost, { isLoading, isSuccess }] = useAddPostMutation();
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
		const images = img === '' ? undefined : img.split('\n');

		if (text.trim() || images?.length) {
			onAddPost({ text, img: images, authorId: userId, profileId });
			dispatch(postActions.clear());
		}
	}, [onAddPost, text, img, userId, profileId, dispatch]);

	return (
		<DynamicModuleLoader reducerKey="post" reducer={postReducer}>
			<Card width="100%">
				<FormWithImg
					withImg={true}
					textPlaceholder={t('Share your news')}
					imgPlaceholder={t('Add images')}
					imgValue={img}
					onChangeImg={onChangeImg}
					textValue={text}
					onChangeText={onChangeText}
					isLoading={isLoading}
					isSuccess={isSuccess}
					onSubmit={onSubmit}
				/>
			</Card>
		</DynamicModuleLoader>
	);
});
