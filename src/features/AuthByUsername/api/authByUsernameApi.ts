import { User } from '@/shared/types/userCard';
import { rtkApi } from '@/shared/api/rtkApi';

interface IAuthByUsernameApiProps {
	password: string;
	username: string;
}

export const authByUsernameApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		authUser: build.mutation<User, IAuthByUsernameApiProps>({
			query: (body) => ({
				method: 'POST',
				url: '/login',
				body,
			}),
		}),
	}),
});

export const { useAuthUserMutation } = authByUsernameApi;
