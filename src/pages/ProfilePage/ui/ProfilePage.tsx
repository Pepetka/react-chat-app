import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Flex } from '@/shared/ui/Flex';
import { SocialCard } from '@/entities/SocialData';
import { PostForm } from '@/entities/Post';
import { getUserAuthData } from '@/entities/User';
import { ProfileCard } from '@/features/ProfileCard';
import { PostListWithComments } from '@/features/PostListWithComments';

const ProfilePage = memo(() => {
	const params = useParams<{ id: string }>();
	const authData = useSelector(getUserAuthData);

	return (
		<Flex
			data-testid="ProfilePage"
			direction="column"
			width="100%"
			height="100%"
			gap="16"
		>
			<ProfileCard userId={authData?.id ?? ''} profileId={params?.id ?? ''} />
			<SocialCard userId={authData?.id ?? ''} profileId={params?.id ?? ''} />
			<PostForm userId={authData?.id ?? ''} profileId={params?.id ?? ''} />
			<PostListWithComments
				userId={authData?.id ?? ''}
				profileId={params?.id ?? ''}
				admin={authData?.id === params?.id}
			/>
		</Flex>
	);
});

export default ProfilePage;
