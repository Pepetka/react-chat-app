import { StateSchema } from '@/app/provider/Store';
import { groupCardApi } from '../../api/groupCardApi';

export const getGroupData =
	({ groupId }: { groupId: string }) =>
	(state: StateSchema) =>
		groupCardApi.endpoints.fetchGroupData.select({ groupId })(state).data;
