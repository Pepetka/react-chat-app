import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { Avatar } from '@/shared/ui/Avatar';
import {
	useFetchFriendsDataQuery,
	useFetchSocialDataQuery,
} from '@/features/SocialCard/api/socialCardApi';
import { Spinner } from '@/shared/ui/Spinner';

interface ISocialCardProps {
	userId: string;
}

const StyledLine = styled.div`
	height: 100%;
	width: 2px;
	background: var(--invert-secondary-color);
`;

export const SocialCard = memo((props: ISocialCardProps) => {
	const { userId } = props;
	const {
		data: socialData,
		isLoading: socialLoading,
		error: socialError,
	} = useFetchSocialDataQuery({ userId });
	const {
		data: friendsData,
		isLoading: friendsLoading,
		error: friendsError,
	} = useFetchFriendsDataQuery({ userId });
	const { t } = useTranslation('profile');

	if (socialLoading || friendsLoading) {
		return (
			<Card width="100%" height="282px">
				<Flex height="100%" justify="center" align="center">
					<Spinner theme="invert" />
				</Flex>
			</Card>
		);
	}

	if (socialError || friendsError) {
		return (
			<Card width="100%" height="282px">
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
		<Card width="100%" height="282px">
			<Flex height="100%" align="center" justify="space-between">
				<Flex width="60%" align="center" justify="space-around">
					<Card width="180px" height="200px" border>
						<Flex direction="column" gap="8">
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
					<Card width="170px" height="200px" border>
						<Flex direction="column" gap="8">
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
					<Card width="170px" height="200px" border>
						<Flex direction="column" gap="8">
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
				</Flex>
				<StyledLine />
				<Flex gap="16" direction="column" width="350px" height="100%">
					<Text
						theme="primary-invert"
						title={t('Friends')}
						TitleTag="p"
						titleAlign="center"
						size="l"
					/>
					{!!friendsData?.length &&
						friendsData.map((friend, i) => {
							if (i < 3) {
								return (
									<Flex key={friend.id} gap="8" align="center">
										<Avatar circle img={friend.avatar} />
										<Text
											text={`${friend.firstname} ${friend.lastname}`}
											theme="primary-invert"
											size="l"
										/>
									</Flex>
								);
							}
							return null;
						})}
				</Flex>
			</Flex>
		</Card>
	);
});
