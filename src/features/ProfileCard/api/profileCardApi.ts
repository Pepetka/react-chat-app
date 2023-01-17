import { User } from '@/entities/User';
import { rtkApi } from '@/shared/api/rtkApi';

interface IProfileCardApiProps {
	userId: string;
}

const profileCardApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchProfileData: build.query<Array<User>, IProfileCardApiProps>({
			query: ({ userId }) => ({
				url: '/users',
				params: {
					id: userId,
				},
			}),
		}),
	}),
});

export const { useFetchProfileDataQuery } = profileCardApi;
