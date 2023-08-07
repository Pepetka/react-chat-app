import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Grid, StyledLine } from '../SocialCard/SocialCard';

interface ISocialCardSkeletonProps {
	'data-testid'?: string;
}

export const SocialCardSkeleton = memo((props: ISocialCardSkeletonProps) => {
	const { 'data-testid': dataTestId } = props;
	const { t } = useTranslation('profile');
	const isBigScreen = useMediaQuery({ minWidth: 1400 });
	const isDesktopOrLaptop = useMediaQuery({ minWidth: 1200 });

	const cardsData: Array<{ name: string }> = useMemo(
		() => [
			{
				name: t('Followers'),
			},
			{
				name: t('Following'),
			},
			{
				name: t('Groups'),
			},
		],
		[t],
	);

	return (
		<Card data-testid={dataTestId} width="100%" minHeight="282px">
			<Flex
				wrap="wrap"
				height="100%"
				align="center"
				justify={isBigScreen ? 'space-between' : 'center'}
			>
				<Flex width={isBigScreen ? '60%' : '100%'} justify="center">
					<Grid isDesktopOrLaptop={!isDesktopOrLaptop}>
						{cardsData.map(({ name }) => (
							<Card key={name} padding="0" width="180px" height="200px" border>
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
									<Skeleton height="40px" margin="4px" width="100px" />
								</Flex>
							</Card>
						))}
					</Grid>
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
					{new Array(3).fill(0).map((_, index) => (
						<Flex key={index} gap="8" align="center">
							<Flex width="50px">
								<Skeleton circle height="50px" width="50px" />
							</Flex>
							<Flex gap="8">
								<Skeleton height="32px" width="80px" margin="4px" />
								<Skeleton height="32px" width="130px" margin="4px" />
							</Flex>
						</Flex>
					))}
				</Flex>
			</Flex>
		</Card>
	);
});
