import { rtkApi } from '@/shared/api/rtkApi';
import { GroupsList } from '@/entities/Group';

interface ISearchGroupsByNAmeApiProps {
	userId: string;
	search?: string;
}

export const searchGroupsByNameApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchGroups: build.query<GroupsList, ISearchGroupsByNAmeApiProps>({
			query: ({ userId, search }) => ({
				url: '/getGroups',
				params: {
					userId,
					search,
				},
			}),
		}),
	}),
});

export const { useLazyFetchGroupsQuery } = searchGroupsByNameApi;
