import { StateSchema } from '@/app/provider/Store';
import { profileCardApi } from '../../api/profileCardApi';

export const getRelations = (
	state: StateSchema,
	{ userId, friendId }: { userId: string; friendId: string },
) =>
	profileCardApi.endpoints.fetchRelationsData.select({ userId, friendId })(
		state,
	).data;
