import { memo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Flex } from '@/shared/ui/Flex';
import { GroupList, GroupForm } from '@/entities/Group';
import { useLazyFetchGroupsQuery } from '../api/searchGroupsByNameApi';

interface ISearchGroupsByNameProps {
	userId: string;
	profileId: string;
}

export const SearchGroupsByName = memo((props: ISearchGroupsByNameProps) => {
	const { userId, profileId } = props;
	const [searchParams] = useSearchParams();
	const [onFetchGroups, { data: groups, isFetching: isLoading, isError }] =
		useLazyFetchGroupsQuery();

	useEffect(() => {
		onFetchGroups({
			userId: profileId,
			search: searchParams.get('search') ?? '',
		});
		// eslint-disable-next-line
	}, [onFetchGroups, userId]);

	return (
		<Flex direction="column" gap="24">
			<GroupForm
				userId={userId}
				profileId={profileId}
				fetchGroups={onFetchGroups}
			/>
			<GroupList isLoading={isLoading} isError={isError} groups={groups} />
		</Flex>
	);
});
