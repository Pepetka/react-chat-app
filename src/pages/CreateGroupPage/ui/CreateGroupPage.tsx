import { memo } from 'react';
import { Flex } from '@/shared/ui/Flex';
import { CreateGroupForm } from '@/features/CreateGroup';

const CreateGroupPage = memo(() => {
	return (
		<Flex
			data-testid="CreateGroupPage"
			justify="center"
			align="flex-start"
			width="100%"
		>
			<CreateGroupForm />
		</Flex>
	);
});

export default CreateGroupPage;
