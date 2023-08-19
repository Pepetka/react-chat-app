import { memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { GroupDataForm, GroupDataFormInputs } from '@/entities/Group';
import {
	useEditGroupMutation,
	useFetchGroupDataQuery,
} from '../../api/editGroupApi';

export const EditGroupForm = memo(() => {
	const { id } = useParams<{ id: string }>();
	const {
		data: groupData,
		isFetching: groupLoading,
		isError: groupError,
	} = useFetchGroupDataQuery(
		{ groupId: id ?? '' },
		{ refetchOnMountOrArgChange: true },
	);
	const [onEditGroup, { error: createError, isLoading, isSuccess }] =
		useEditGroupMutation();

	const onEditGroupHandle = useCallback(
		(data: GroupDataFormInputs) => {
			onEditGroup({ ...data, groupId: id ?? '' });
		},
		[id, onEditGroup],
	);

	return (
		<GroupDataForm
			data-testid="EditGroupForm"
			onSendGroupData={onEditGroupHandle}
			groupData={groupData}
			sendError={createError}
			isLoading={isLoading}
			isSuccess={isSuccess}
			groupLoading={groupLoading}
			groupError={groupError}
			withReset
		/>
	);
});
