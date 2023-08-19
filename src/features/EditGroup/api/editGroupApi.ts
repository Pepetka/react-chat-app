import { Group, groupApi, GroupDataFormInputs } from '@/entities/Group';

export const editGroupApi = groupApi.injectEndpoints({
	endpoints: (build) => ({
		editGroup: build.mutation<Group, GroupDataFormInputs & { groupId: string }>(
			{
				query: ({ avatar, description, name, tags, groupId }) => {
					const formData = new FormData();

					formData.append('groupId', groupId);
					formData.append('description', description ?? '');
					formData.append('name', name ?? '');
					tags?.split('#').forEach((tag, index) => {
						if (index) formData.append('tags', tag);
					});
					if (avatar?.[0]) formData.append('avatar', avatar[0]);

					return {
						url: '/group',
						method: 'Put',
						body: formData,
					};
				},
			},
		),
	}),
});

export const { useEditGroupMutation, useFetchGroupDataQuery } = editGroupApi;
