import { rtkApi } from '@/shared/api/rtkApi';
import { GroupRole } from '../model/types/groupPage';

interface IPostApiProps {
	groupId: string;
	userId: string;
}

export const groupPageApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchRole: build.query<GroupRole, IPostApiProps>({
			query: ({ groupId, userId }) => ({
				url: '/group-members',
				params: {
					userId,
					groupId,
				},
			}),
			providesTags: (result) => [],
		}),
	}),
});

export const { useFetchRoleQuery } = groupPageApi;
