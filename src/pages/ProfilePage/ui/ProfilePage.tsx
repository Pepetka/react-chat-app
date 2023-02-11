import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ProfileCard } from '@/features/ProfileCard';
import { SocialCard } from '@/features/SocialCard';
import { Flex } from '@/shared/ui/Flex';
import { PostForm, PostList } from '@/entities/Post';
import { getUserAuthData } from '@/entities/User';

const ProfilePage = memo(() => {
	const params = useParams<{ id: string }>();
	const authData = useSelector(getUserAuthData);

	return (
		<Flex direction="column" width="100%" height="100%" gap="16">
			<ProfileCard userId={authData?.id ?? ''} profileId={params?.id ?? ''} />
			<SocialCard userId={authData?.id ?? ''} profileId={params?.id ?? ''} />
			<PostForm userId={authData?.id ?? ''} profileId={params?.id ?? ''} />
			<PostList userId={authData?.id ?? ''} profileId={params?.id ?? ''} />
		</Flex>
	);
});

export default ProfilePage;
