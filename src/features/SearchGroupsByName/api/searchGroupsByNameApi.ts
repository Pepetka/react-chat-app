import { rtkApi } from '@/shared/api/rtkApi';
import { Group } from '@/entities/Group';

interface ISearchChatsByNAmeApiProps {
	userId: string;
	search?: string;
}

export const searchGroupsByNameApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchGroups: build.query<Array<Group>, ISearchChatsByNAmeApiProps>({
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
