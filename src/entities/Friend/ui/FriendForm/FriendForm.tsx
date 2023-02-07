import { memo, useCallback, useState } from 'react';
import { Input } from '@/shared/ui/Input';
import { useTranslation } from 'react-i18next';
import { useDebounce } from '@/shared/hooks/useDebounce';

interface IFriendFormProps {}

export const FriendForm = memo((props: IFriendFormProps) => {
	// const {} = props;
	const { t } = useTranslation('friends');
	const [value, setValue] = useState('');

	const callback = useCallback((value: string) => {
		if (value) {
			console.log(value);
		}
	}, []);

	const debounce = useDebounce({
		callback,
	});

	const onChange = useCallback(
		(text: string) => {
			setValue(text);
			debounce(text);
		},
		[debounce],
	);

	return (
		<Input
			paddingInline="20px"
			theme="invert"
			value={value}
			onChange={onChange}
			width="100%"
			height="50px"
			name="friend"
			borderRadius="25px"
			label={t('Find your friend')}
		/>
	);
});
