import { Group } from '@/entities/Group';
import { rtkApi } from '@/shared/api/rtkApi';

interface IGroupCardApiProps {
	groupId: string;
}

export const groupCardApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchGroupData: build.query<Group, IGroupCardApiProps>({
			query: ({ groupId }) => ({
				url: '/group',
				params: {
					groupId,
				},
			}),
		}),
	}),
});

export const { useFetchGroupDataQuery } = groupCardApi;
