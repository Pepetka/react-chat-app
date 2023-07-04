import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Flex } from '@/shared/ui/Flex';
import { getUserAuthData } from '@/entities/User';
import { PostForm } from '@/entities/Post';
import { getGroupData, GroupDataCard } from '@/features/GroupDataCard';
import { PostListWithComments } from '@/features/PostListWithComments';
import { useFetchRoleQuery } from '../api/groupPageApi';

const GroupPage = memo(() => {
	const params = useParams<{ id: string }>();
	const authData = useSelector(getUserAuthData);
	const { data: roleData } = useFetchRoleQuery({
		groupId: params?.id ?? '',
		userId: authData?.id ?? '',
	});
	const groupData = useSelector(getGroupData({ groupId: params.id ?? '' }));

	return (
		<Flex direction="column" width="100%" height="100%" gap="16">
			<GroupDataCard groupId={params?.id ?? ''} />
			{(roleData?.role === 'admin' || roleData?.role === 'moderator') && (
				<PostForm
					userId={authData?.id ?? ''}
					profileId={params.id ?? ''}
					authorData={groupData}
				/>
			)}
			<PostListWithComments
				userId={authData?.id ?? ''}
				profileId={params.id ?? ''}
				admin={roleData?.role === 'admin' || roleData?.role === 'moderator'}
			/>
		</Flex>
	);
});

export default GroupPage;
