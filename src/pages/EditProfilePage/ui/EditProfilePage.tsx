import { memo } from 'react';
import { Flex } from '@/shared/ui/Flex';
import { EditProfileForm } from '@/features/EditProfile';

const EditProfilePage = memo(() => {
	return (
		<Flex
			data-testid="EditProfilePage"
			justify="center"
			align="center"
			width="100%"
		>
			<EditProfileForm />
		</Flex>
	);
});

export default EditProfilePage;
