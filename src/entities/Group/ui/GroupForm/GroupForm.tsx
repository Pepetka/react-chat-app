import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/shared/ui/Input';
import { DynamicModuleLoader } from '@/shared/components';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useDebounce } from '@/shared/hooks/useDebounce';
import CloseIcon from '@/shared/assets/close.svg';
import { getGroupSearch } from '../../model/selectors/groupSelectors';
import { groupActions, groupReducer } from '../../model/slice/groupSlice';

interface IGroupFormProps {
	userId: string;
	profileId: string;
	fetchGroups?: ({
		userId,
		search,
	}: {
		userId: string;
		search: string;
	}) => void;
	'data-testid'?: string;
}

export const GroupForm = memo((props: IGroupFormProps) => {
	const { fetchGroups, profileId, 'data-testid': dataTestId } = props;
	const { t } = useTranslation('group');
	const search = useSelector(getGroupSearch);
	const dispatch = useAppDispatch();
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		dispatch(groupActions.setSearch(searchParams.get('search') ?? ''));
		// eslint-disable-next-line
	}, []);

	const callback = useCallback(
		({ text }: { text: string }) => {
			fetchGroups?.({
				userId: profileId,
				search: text,
			});
		},
		[fetchGroups, profileId],
	);

	const debounce = useDebounce({
		callback,
	});

	const onSearch = useCallback(
		(text: string) => {
			const params = text ? { search: text } : undefined;
			setSearchParams(params);

			dispatch(groupActions.setSearch(text));
			debounce({ text });
		},
		[debounce, dispatch, setSearchParams],
	);

	const onClear = useCallback(() => {
		onSearch('');
	}, [onSearch]);

	return (
		<DynamicModuleLoader reducerKey="group" reducer={groupReducer}>
			<Input
				data-testid={`${dataTestId}.input`}
				paddingInline="20px"
				theme="invert"
				value={search}
				onChange={onSearch}
				width="100%"
				height="50px"
				name="chat"
				borderRadius="25px"
				label={t('Find your group')}
				SvgIcon={CloseIcon}
				onClick={onClear}
			/>
		</DynamicModuleLoader>
	);
});
