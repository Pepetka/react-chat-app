import { UserSchema } from '@/entities/User';
import { AuthByUsernameSchema } from '@/features/AuthByUsername';
import { rtkApi } from '@/shared/api/rtkApi';

export interface StateSchema {
	user: UserSchema;
	authByUsername: AuthByUsernameSchema;
	[rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
}
