import { memo } from 'react';
import { Flex } from '@/shared/ui/Flex';
import { EditGroupForm } from '@/features/EditGroup';

const EditGroupPage = memo(() => {
	return (
		<Flex
			data-testid="EditGroupPage"
			justify="center"
			align="flex-start"
			width="100%"
		>
			<EditGroupForm />
		</Flex>
	);
});

export default EditGroupPage;
