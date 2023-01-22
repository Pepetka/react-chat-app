import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { ProfileCard } from '@/features/ProfileCard';
import { SocialCard } from '@/features/SocialCard';
import { Flex } from '@/shared/ui/Flex';

const ProfilePage = memo(() => {
	const params = useParams<{ id: string }>();

	return (
		<Flex direction="column" width="100%" height="100%" gap="16">
			<ProfileCard userId={params?.id ?? ''} />
			<SocialCard userId={params?.id ?? ''} />
		</Flex>
	);
});

export default ProfilePage;
