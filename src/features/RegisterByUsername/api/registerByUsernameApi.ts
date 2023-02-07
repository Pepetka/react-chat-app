import { User } from '@/shared/types/userCard';
import { rtkApi } from '@/shared/api/rtkApi';
import { RegisterByUsernameSchema } from '../model/types/RegisterByUsernameSchema';

const registerByUsernameApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		registerUser: build.mutation<User, RegisterByUsernameSchema>({
			query: (body) => ({
				method: 'POST',
				url: '/register',
				body,
			}),
		}),
	}),
});

export const { useRegisterUserMutation } = registerByUsernameApi;
