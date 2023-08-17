import { rtkApi } from '@/shared/api/rtkApi';
import { User } from '@/shared/types/userCard';

export interface IEditProfileProps {
	firstname: string;
	lastname: string;
	email: string;
	status: string | undefined;
	age: number;
	avatar: any;
}

export const profileApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchProfileData: build.query<User, { profileId: string }>({
			query: ({ profileId }) => ({
				url: '/profile',
				params: {
					profileId,
				},
			}),
		}),
		editProfile: build.mutation<User, IEditProfileProps>({
			query: ({ firstname, lastname, age, avatar, email, status }) => {
				const formData = new FormData();

				formData.append('status', status ?? '');
				formData.append('email', email ?? '');
				formData.append('firstname', firstname ?? '');
				formData.append('lastname', lastname ?? '');
				formData.append('age', `${age}` ?? '');
				if (avatar?.[0]) formData.append('avatar', avatar[0]);

				return {
					url: '/profile',
					method: 'Put',
					body: formData,
				};
			},
		}),
	}),
});
