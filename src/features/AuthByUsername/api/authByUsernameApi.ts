import { User } from '@/shared/types/userCard';
import { rtkApi } from '@/shared/api/rtkApi';
import { Inputs } from '../ui/LoginForm/LoginForm';

export const authByUsernameApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		authUser: build.mutation<User, Inputs>({
			query: (body) => ({
				method: 'POST',
				url: '/login',
				body,
			}),
		}),
	}),
});

export const { useAuthUserMutation } = authByUsernameApi;
