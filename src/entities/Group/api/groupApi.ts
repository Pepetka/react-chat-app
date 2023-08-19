import { Group } from '@/entities/Group';
import { rtkApi } from '@/shared/api/rtkApi';

interface IGroupApiProps {
	groupId: string;
}

export const groupApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchGroupData: build.query<Group, IGroupApiProps>({
			query: ({ groupId }) => ({
				url: '/group',
				params: {
					groupId,
				},
			}),
		}),
	}),
});
