import { useParams } from 'react-router-dom';
import { ProfileCard } from '@/features/ProfileCard';
import { memo } from 'react';

const ProfilePage = memo(() => {
	const params = useParams<{ id: string }>();

	return <ProfileCard userId={params?.id ?? ''} />;
});

export default ProfilePage;
