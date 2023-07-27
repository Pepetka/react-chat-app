import { KeyboardEvent, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FormWithImg } from '@/shared/ui/FormWithImg';
import { DynamicModuleLoader } from '@/shared/components';
import { messageReducer } from '../../model/slice/messageSlice';

interface IMessageFormProps {
	onSubmit?: ({ text, files }: { text?: string; files?: FileList }) => void;
	onTyping?: (e: KeyboardEvent) => void;
	isLoading: boolean;
	isSuccess: boolean;
}

export const MessageForm = memo((props: IMessageFormProps) => {
	const { isLoading, isSuccess, onSubmit, onTyping } = props;
	const { t } = useTranslation('chats');

	const onSubmitHandle = useCallback(
		(data: { text?: string; files?: FileList }) => {
			if (data.text || data.files) {
				onSubmit?.({ text: data.text, files: data.files });
			}
		},
		[onSubmit],
	);

	return (
		<DynamicModuleLoader reducerKey="message" reducer={messageReducer}>
			<FormWithImg
				small
				modal
				withImg
				textPlaceholder={t('Message')}
				onSubmit={onSubmitHandle}
				isLoading={isLoading}
				isSuccess={isSuccess}
				onTyping={onTyping}
			/>
		</DynamicModuleLoader>
	);
});
