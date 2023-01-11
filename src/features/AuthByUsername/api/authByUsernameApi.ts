import { User } from '@/entities/User';
import { rtkApi } from '@/shared/api/rtkApi';

interface IAuthByUsernameApiProps {
	password: string;
	username: string;
}

const authByUsernameApi = rtkApi.injectEndpoints({
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
