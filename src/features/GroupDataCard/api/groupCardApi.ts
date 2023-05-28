import { Group } from '@/entities/Group';
import { rtkApi } from '@/shared/api/rtkApi';

interface IGroupCardApiProps {
	groupId: string;
}

export const groupCardApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchGroupData: build.query<Array<Group>, IGroupCardApiProps>({
			query: ({ groupId }) => ({
				url: '/groups',
				params: {
					id: groupId,
				},
			}),
		}),
	}),
});

export const { useFetchGroupDataQuery } = groupCardApi;
