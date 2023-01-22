import { memo, useMemo } from 'react';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { Avatar } from '@/shared/ui/Avatar';
import { Button } from '@/shared/ui/Button';
import {
	useFetchProfileDataQuery,
	useFetchRelationsDataQuery,
} from '../api/profileCardApi';
import { Spinner } from '@/shared/ui/Spinner';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { Relations } from '../model/types/profileCardSchema';

interface IProfileCardProps {
	userId: string;
}

export const ProfileCard = memo((props: IProfileCardProps) => {
	const { userId } = props;
	const { t } = useTranslation('profile');
	const authData = useSelector(getUserAuthData);
	const {
		data: profileData,
		isLoading: profileLoading,
		error: profileError,
	} = useFetchProfileDataQuery({ userId });
	const {
		data: relationsData,
		isLoading: relationsLoading,
		error: relationsError,
	} = useFetchRelationsDataQuery({ userId, friendId: authData?.id ?? '' });

	const friendBtnText: Record<Relations, string> = useMemo(
		() => ({
			follower: 'Add friend',
			following: 'Unfollow',
			friend: 'Unfriend',
			nobody: 'Follow',
		}),
		[],
	);

	if (profileLoading || relationsLoading) {
		return (
			<Card width="100%" height="400px" borderRadius={false}>
				<Flex height="100%" justify="center" align="center">
					<Spinner theme="invert" />
				</Flex>
			</Card>
		);
	}

	if (profileError || relationsError) {
		return (
			<Card width="100%" height="400px" borderRadius={false}>
				<Flex height="100%" justify="center" align="center">
					<Text
						title={t('Something went wrong')}
						TitleTag="p"
						titleAlign="center"
					/>
				</Flex>
			</Card>
		);
	}

	return (
		<Card width="100%" height="400px" borderRadius={false}>
			<Flex height="100%" gap="8">
				<Flex width="20%">
					<Text theme="secondary-invert" text={t('online')} />
				</Flex>
				<Flex direction="column" justify="space-between">
					<Flex direction="column" gap="8">
						<Text
							textAlign="right"
							theme="primary-invert"
							text={`${profileData?.[0]?.firstname} ${profileData?.[0]?.lastname}`}
							size="xl"
						/>
						<Text
							textAlign="right"
							theme="secondary-invert"
							text={`id:${profileData?.[0]?.id}`}
							size="m"
						/>
						<Text
							textAlign="right"
							theme="primary-invert"
							text={profileData?.[0]?.status}
							size="l"
						/>
					</Flex>
					{authData?.id !== userId && (
						<Flex justify="end" gap="24">
							<Button width="180px" height="50px" invert>
								<Text
									textAlign="center"
									size="l"
									text={t(friendBtnText[relationsData ?? 'nobody'])}
								/>
							</Button>
							<Button width="180px" height="50px" invert>
								<Text textAlign="center" size="l" text={t('Send mess')} />
							</Button>
						</Flex>
					)}
				</Flex>
				<Avatar img={profileData?.[0]?.avatar ?? ''} size="xl" />
			</Flex>
		</Card>
	);
});
