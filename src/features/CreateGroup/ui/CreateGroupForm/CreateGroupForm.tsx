import { memo } from 'react';
import { GroupDataForm } from '@/entities/Group';
import { useCreateGroupMutation } from '../../api/createGroupApi';

export const CreateGroupForm = memo(() => {
	const [
		onCreateGroup,
		{ data: groupData, error: createError, isLoading, isSuccess },
	] = useCreateGroupMutation();

	return (
		<GroupDataForm
			data-testid="CreateGroupForm"
			onSendGroupData={onCreateGroup}
			groupData={groupData}
			sendError={createError}
			isLoading={isLoading}
			isSuccess={isSuccess}
		/>
	);
});
