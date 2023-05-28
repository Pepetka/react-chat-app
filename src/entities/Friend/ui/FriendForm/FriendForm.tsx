import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/shared/ui/Input';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { DynamicModuleLoader } from '@/shared/components';
import { useDebounce } from '@/shared/hooks/useDebounce';
import CloseIcon from '@/shared/assets/close.svg';
import { friendActions, friendReducer } from '../../model/slice/friendSlice';
import { getFriendSearch } from '../../model/selectors/friendSelectors';

interface IFriendFormProps {
	profileId: string;
	userId: string;
	fetchFriends?: ({
		userId,
		search,
	}: {
		userId: string;
		search: string;
	}) => void;
}

export const FriendForm = memo((props: IFriendFormProps) => {
	const { profileId, fetchFriends } = props;
	const { t } = useTranslation('friends');
	const dispatch = useAppDispatch();
	const search = useSelector(getFriendSearch);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		dispatch(friendActions.setSearch(searchParams.get('search') ?? ''));
		// eslint-disable-next-line
	}, []);

	const callback = useCallback(
		({ text }: { text: string }) => {
			fetchFriends?.({ userId: profileId, search: text });
		},
		[fetchFriends, profileId],
	);

	const debounce = useDebounce({
		callback,
	});

	const onSearch = useCallback(
		(text: string) => {
			const params = text ? { search: text } : undefined;
			setSearchParams(params);

			dispatch(friendActions.setSearch(text));
			debounce({ text });
		},
		[debounce, dispatch, setSearchParams],
	);

	const onClear = useCallback(() => {
		onSearch('');
	}, [onSearch]);

	return (
		<DynamicModuleLoader reducerKey="friend" reducer={friendReducer}>
			<Input
				paddingInline="20px"
				theme="invert"
				value={search}
				onChange={onSearch}
				width="100%"
				height="50px"
				name="friend"
				borderRadius="25px"
				label={t('Find your friend')}
				SvgIcon={CloseIcon}
				onClick={onClear}
			/>
		</DynamicModuleLoader>
	);
});
