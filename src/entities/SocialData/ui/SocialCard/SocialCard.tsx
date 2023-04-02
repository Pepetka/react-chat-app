import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { UserCard } from '@/shared/ui/UserCard';
import { AppLink } from '@/shared/ui/AppLink';
import {
	getFriendsPagePath,
	getGroupsListPagePath,
} from '@/shared/const/router';
import { SocialCardSkeleton } from '../SocialCardSkeleton/SocialCardSkeleton';
import {
	useFetchFriendsDataQuery,
	useFetchSocialDataQuery,
} from '../../api/socialDataApi';

interface ISocialCardProps {
	userId: string;
	profileId: string;
}

export const StyledLine = styled.div`
	height: 100%;
	width: 2px;
	background: var(--invert-secondary-color);
`;

export const SocialCard = memo((props: ISocialCardProps) => {
	const { profileId } = props;
	const {
		data: socialData,
		isFetching: socialLoading,
		error: socialError,
	} = useFetchSocialDataQuery(
		{ profileId },
		{ refetchOnMountOrArgChange: true },
	);
	const {
		data: friendsData,
		isFetching: friendsLoading,
		error: friendsError,
	} = useFetchFriendsDataQuery({ profileId });
	const { t } = useTranslation('profile');

	if (socialLoading || friendsLoading) {
		return <SocialCardSkeleton />;
	}

	if (socialError || friendsError) {
		return (
			<Card width="100%" height="282px">
				<Flex height="100%" justify="center" align="center">
					<Text
						theme="error"
						title={t('Something went wrong')}
						TitleTag="p"
						titleAlign="center"
					/>
				</Flex>
			</Card>
		);
	}

	return (
		<Card width="100%" height="282px">
			<Flex height="100%" align="center" justify="space-between">
				<Flex width="60%" align="center" justify="space-around">
					<AppLink to={getFriendsPagePath(profileId)}>
						<Card padding="0" width="180px" height="200px" border>
							<Flex
								direction="column"
								gap="8"
								height="100%"
								justify="center"
								align="center"
							>
								<Text
									theme="primary-invert"
									text={t('Followers')}
									size="l"
									textAlign="center"
								/>
								<Text
									theme="secondary-invert"
									title={socialData?.followersNum}
									size="xl"
									titleAlign="center"
								/>
							</Flex>
						</Card>
					</AppLink>
					<AppLink to={getFriendsPagePath(profileId)}>
						<Card padding="0" width="180px" height="200px" border>
							<Flex
								direction="column"
								gap="8"
								height="100%"
								justify="center"
								align="center"
							>
								<Text
									theme="primary-invert"
									text={t('Following')}
									size="l"
									textAlign="center"
								/>
								<Text
									theme="secondary-invert"
									title={socialData?.followingNum}
									size="xl"
									titleAlign="center"
								/>
							</Flex>
						</Card>
					</AppLink>
					<AppLink to={getGroupsListPagePath(profileId)}>
						<Card padding="0" width="180px" height="200px" border>
							<Flex
								direction="column"
								gap="8"
								height="100%"
								justify="center"
								align="center"
							>
								<Text
									theme="primary-invert"
									text={t('Groups')}
									size="l"
									textAlign="center"
								/>
								<Text
									theme="secondary-invert"
									title={socialData?.groupsNum}
									size="xl"
									titleAlign="center"
								/>
							</Flex>
						</Card>
					</AppLink>
				</Flex>
				<StyledLine />
				<Flex gap="16" direction="column" width="350px" height="100%">
					<AppLink to={getFriendsPagePath(profileId)}>
						<Text
							theme="primary-invert"
							title={t('Friends')}
							TitleTag="p"
							titleAlign="center"
							size="l"
						/>
					</AppLink>
					{!!friendsData?.length &&
						friendsData.map((friend, i) => {
							if (i < 3) {
								return (
									<UserCard
										key={friend.id}
										id={friend.id}
										name={`${friend.firstname} ${friend.lastname}`}
										avatar={friend.avatar}
									/>
								);
							}
							return null;
						})}
				</Flex>
			</Flex>
		</Card>
	);
});
