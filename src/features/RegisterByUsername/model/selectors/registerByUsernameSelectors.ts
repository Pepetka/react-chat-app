import { StateSchema } from '@/app/provider/Store';

export const registerByUsernameState = (state: StateSchema) =>
	state?.registerByUsername ?? {
		password: '',
		username: '',
		lastname: '',
		firstname: '',
		email: '',
		age: 0,
	};
