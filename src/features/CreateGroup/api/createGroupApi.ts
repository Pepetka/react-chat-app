import { rtkApi } from '@/shared/api/rtkApi';
import { Group, GroupDataFormInputs } from '@/entities/Group';

export const createGroupApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		createGroup: build.mutation<Group, GroupDataFormInputs>({
			query: ({ avatar, description, name, tags }) => {
				const formData = new FormData();

				formData.append('description', description ?? '');
				formData.append('name', name ?? '');
				tags?.split('#').forEach((tag, index) => {
					if (index) formData.append('tags', tag);
				});
				if (avatar?.[0]) formData.append('avatar', avatar[0]);

				return {
					url: '/group',
					method: 'Post',
					body: formData,
				};
			},
		}),
	}),
});

export const { useCreateGroupMutation } = createGroupApi;
