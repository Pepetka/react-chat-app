import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { memo } from 'react';
import { StyledLine } from '../SocialCard/SocialCard';
import { Text } from '@/shared/ui/Text';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@/shared/ui/Skeleton';

export const SocialCardSkeleton = memo(() => {
	const { t } = useTranslation('profile');

	return (
		<Card width="100%" height="282px">
			<Flex height="100%" align="center" justify="space-between">
				<Flex width="60%" align="center" justify="space-around">
					<Card padding="0" width="180px" height="200px" border>
						<Flex direction="column" gap="8" align="center">
							<Text
								theme="primary-invert"
								text={t('Followers')}
								size="l"
								textAlign="center"
							/>
							<Skeleton height="40px" margin="4px" width="100px" />
						</Flex>
					</Card>
					<Card padding="0" width="180px" height="200px" border>
						<Flex direction="column" gap="8" align="center">
							<Text
								theme="primary-invert"
								text={t('Following')}
								size="l"
								textAlign="center"
							/>
							<Skeleton height="40px" margin="4px" width="100px" />
						</Flex>
					</Card>
					<Card padding="0" width="180px" height="200px" border>
						<Flex direction="column" gap="8" align="center">
							<Text
								theme="primary-invert"
								text={t('Groups')}
								size="l"
								textAlign="center"
							/>
							<Skeleton height="40px" margin="4px" width="100px" />
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
					<Flex gap="8" align="center">
						<Flex width="50px">
							<Skeleton circle height="50px" width="50px" />
						</Flex>
						<Flex gap="8">
							<Skeleton height="32px" width="100px" margin="4px" />
							<Skeleton height="32px" width="130px" margin="4px" />
						</Flex>
					</Flex>
					<Flex gap="8" align="center">
						<Flex width="50px">
							<Skeleton circle height="50px" width="50px" />
						</Flex>
						<Flex gap="8">
							<Skeleton height="32px" width="100px" margin="4px" />
							<Skeleton height="32px" width="130px" margin="4px" />
						</Flex>
					</Flex>
					<Flex gap="8" align="center">
						<Flex width="50px">
							<Skeleton circle height="50px" width="50px" />
						</Flex>
						<Flex gap="8">
							<Skeleton height="32px" width="100px" margin="4px" />
							<Skeleton height="32px" width="130px" margin="4px" />
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Card>
	);
});
