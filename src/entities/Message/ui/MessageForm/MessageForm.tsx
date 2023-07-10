import { KeyboardEvent, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FormWithImg } from '@/shared/ui/FormWithImg';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { DynamicModuleLoader } from '@/shared/components';
import { getMessageState } from '../../model/selectors/messageSelectors';
import { messageActions, messageReducer } from '../../model/slice/messageSlice';

interface IMessageFormProps {
	onSubmit?: (text: string, images?: Array<string>) => void;
	onTyping?: (e: KeyboardEvent) => void;
	isLoading: boolean;
	isSuccess: boolean;
}

export const MessageForm = memo((props: IMessageFormProps) => {
	const { isLoading, isSuccess, onSubmit, onTyping } = props;
	const { t } = useTranslation('chats');
	const { text, images } = useSelector(getMessageState);
	const dispatch = useAppDispatch();

	const onSubmitHandle = useCallback(() => {
		const imagesArray = images ? images.split('\n') : undefined;

		onSubmit?.(text, imagesArray);
		dispatch(messageActions.clear());
	}, [dispatch, images, onSubmit, text]);

	const onChangeTextHandle = useCallback(
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
				textPlaceholder={t('Message')}
				imgPlaceholder={t('Images')}
				onSubmit={onSubmitHandle}
				isLoading={isLoading}
				isSuccess={isSuccess}
				textValue={text}
				onChangeText={onChangeTextHandle}
				imgValue={images}
				onChangeImg={onChangeImg}
				onTyping={onTyping}
			/>
		</DynamicModuleLoader>
	);
});
