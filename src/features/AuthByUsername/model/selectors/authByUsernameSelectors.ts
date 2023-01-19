import { StateSchema } from '@/app/provider/Store';

export const authByUsernameState = (state: StateSchema) =>
	state?.authByUsername ?? { password: '', username: '' };
