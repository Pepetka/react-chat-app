import { User } from '@/shared/types/userCard';
import { rtkApi } from '@/shared/api/rtkApi';
import { Inputs } from '../ui/RegisterForm/RegisterForm';

const registerByUsernameApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		registerUser: build.mutation<User, Inputs>({
			query: (body) => ({
				method: 'POST',
				url: '/register',
				body,
			}),
		}),
	}),
});

export const { useRegisterUserMutation } = registerByUsernameApi;
