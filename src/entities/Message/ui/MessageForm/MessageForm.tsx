import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FormWithImg } from '@/shared/ui/FormWithImg';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { DynamicModuleLoader } from '@/shared/components';
import { getMessageState } from '../../model/selectors/messageSelectors';
import { messageActions, messageReducer } from '../../model/slice/messageSlice';

interface IMessageFormProps {
	onSubmit?: () => void;
	isLoading: boolean;
	isSuccess: boolean;
}

export const MessageForm = memo((props: IMessageFormProps) => {
	const { isLoading, isSuccess, onSubmit } = props;
	const { t } = useTranslation('chats');
	const { text, images } = useSelector(getMessageState);
	const dispatch = useAppDispatch();

	const onChangeText = useCallback(
		(text: string) => {
			dispatch(messageActions.setText(text));
		},
		[dispatch],
	);

	const onChangeImg = useCallback(
		(images: string) => {
			dispatch(messageActions.setImages(images));
		},
		[dispatch],
	);

	return (
		<DynamicModuleLoader reducerKey="message" reducer={messageReducer}>
			<FormWithImg
				small
				modal
				withImg
				textPlaceholder={t('Enter your message')}
				imgPlaceholder={t('Enter your images')}
				onSubmit={onSubmit}
				isLoading={isLoading}
				isSuccess={isSuccess}
				textValue={text}
				onChangeText={onChangeText}
				imgValue={images}
				onChangeImg={onChangeImg}
			/>
		</DynamicModuleLoader>
	);
});
