import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
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
	min-height: 2px;
	min-width: 100%;
	margin-block: 8px;
	background: var(--invert-secondary-color);

	@media (min-width: 1399px) {
		min-height: 100%;
		min-width: 2px;
		margin-block: 0;
	}
`;

export const Grid = styled.div<{ isDesktopOrLaptop: boolean }>`
	display: grid;
	grid-auto-flow: ${(props) => (props.isDesktopOrLaptop ? 'row' : 'column')};
	grid-template-columns: repeat(auto-fit, 180px);
	grid-template-rows: repeat(auto-fit, 200px);
	justify-items: center;
	align-items: center;
	gap: 16px;
`;

export const SocialCard = memo((props: ISocialCardProps) => {
	const { profileId } = props;
	const isBigScreen = useMediaQuery({ minWidth: 1400 });
	const isDesktopOrLaptop = useMediaQuery({ minWidth: 1200 });
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

	const cardsData: Array<{ link: string; name: string; num?: string }> =
		useMemo(
			() => [
				{
					link: getFriendsPagePath(profileId),
					name: t('Followers'),
					num: socialData?.followersNum,
				},
				{
					link: getFriendsPagePath(profileId),
					name: t('Following'),
					num: socialData?.followingNum,
				},
				{
					link: getGroupsListPagePath(profileId),
					name: t('Groups'),
					num: socialData?.groupsNum,
				},
			],
			[
				profileId,
				socialData?.followersNum,
				socialData?.followingNum,
				socialData?.groupsNum,
				t,
			],
		);

	if (socialLoading || friendsLoading) {
		return <SocialCardSkeleton data-testid="SocialCard.skeleton" />;
	}

	if (socialError || friendsError) {
		return (
			<Card data-testid="SocialCard.error" width="100%" height="282px">
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
		<Card width="100%" minHeight="282px">
			<Flex
				direction={isBigScreen ? 'row' : 'column'}
				height="100%"
				align="center"
				justify={isBigScreen ? 'space-between' : 'center'}
			>
				<Flex width={isBigScreen ? '60%' : '100%'} justify="center">
					<Grid isDesktopOrLaptop={!isDesktopOrLaptop}>
						{cardsData.map(({ link, name, num }) => (
							<AppLink
								data-testid={`SocialCard.cards.${name}.${num}`}
								key={name}
								to={link}
							>
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
											text={name}
											size="l"
											textAlign="center"
										/>
										<Text
											theme="secondary-invert"
											title={num}
											size="xl"
											titleAlign="center"
										/>
									</Flex>
								</Card>
							</AppLink>
						))}
					</Grid>
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
							if (i >= 3) {
								return null;
							}

							return (
								<UserCard
									data-testid={`SocialCard.friends.${friend.id}`}
									key={friend.id}
									id={friend.id}
									name={friend.name}
									avatar={friend.avatar}
								/>
							);
						})}
				</Flex>
			</Flex>
		</Card>
	);
});
