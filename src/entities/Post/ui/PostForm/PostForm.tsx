import { memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FormWithImg } from '@/shared/ui/FormWithImg';
import { DynamicModuleLoader } from '@/shared/components';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Card } from '@/shared/ui/Card';
import { UserMini } from '@/shared/types/userCard';
import { getPostState } from '../../model/selectors/postSelectors';
import { postActions, postReducer } from '../../model/slice/postSlice';
import { useAddPostMutation } from '../../api/postApi';

interface IPostFormProps {
	userId: string;
	profileId: string;
	authorData?: UserMini;
}

export const PostForm = memo((props: IPostFormProps) => {
	const { userId, profileId, authorData } = props;
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
			onAddPost({ text, img: images, authorId: userId, profileId, authorData });
			dispatch(postActions.clear());
		}
	}, [img, text, onAddPost, userId, profileId, authorData, dispatch]);

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
