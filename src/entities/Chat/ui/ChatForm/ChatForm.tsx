import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/shared/ui/Input';
import { DynamicModuleLoader } from '@/shared/components';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useDebounce } from '@/shared/hooks/useDebounce';
import CloseIcon from '@/shared/assets/close.svg';
import { chatActions, chatReducer } from '../../model/slice/chatSlice';
import { getChatSearch } from '../../model/selectors/chatSelectors';

interface IChatFormProps {
	userId: string;
	fetchChats?: ({ userId, search }: { userId: string; search: string }) => void;
}

export const ChatForm = memo((props: IChatFormProps) => {
	const { fetchChats, userId } = props;
	const { t } = useTranslation('chats');
	const search = useSelector(getChatSearch);
	const dispatch = useAppDispatch();
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		dispatch(chatActions.setSearch(searchParams.get('search') ?? ''));
	}, []);

	const callback = useCallback(
		({ text }: { text: string }) => {
			fetchChats?.({
				userId,
				search: text,
			});
		},
		[fetchChats, userId],
	);

	const debounce = useDebounce({
		callback,
	});

	const onSearch = useCallback(
		(text: string) => {
			const params = text ? { search: text } : undefined;
			setSearchParams(params);

			dispatch(chatActions.setSearch(text));
			debounce({ text });
		},
		[debounce, dispatch, setSearchParams],
	);

	const onClear = useCallback(() => {
		onSearch('');
	}, [onSearch]);

	return (
		<DynamicModuleLoader reducerKey="chat" reducer={chatReducer}>
			<Input
				paddingInline="20px"
				theme="invert"
				value={search}
				onChange={onSearch}
				width="100%"
				height="50px"
				name="chat"
				borderRadius="25px"
				label={t('Find your chat')}
				SvgIcon={CloseIcon}
				onClick={onClear}
			/>
		</DynamicModuleLoader>
	);
});
