import { memo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Flex } from '@/shared/ui/Flex';
import { Card } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';

interface IProfileCardSkeletonProps {
	showBtns: boolean;
}

export const ProfileCardSkeleton = memo((props: IProfileCardSkeletonProps) => {
	const { showBtns } = props;
	const isBigScreen = useMediaQuery({ minWidth: 1400 });
	const isSmallestScreen = useMediaQuery({ maxWidth: 540 });
	const isDesktopOrLaptop = useMediaQuery({ minWidth: 1200 });

	return (
		<Card width="100%" minHeight="400px" borderRadius={false}>
			<Flex wrap="wrap" height="100%" justify="space-between">
				<Flex width="100px">
					<Skeleton height="24px" width="100%" />
				</Flex>
				<Flex
					wrap="wrap"
					width={isBigScreen ? 'auto' : '100%'}
					gap="8"
					justify="center"
				>
					<Flex
						width={isSmallestScreen ? '100%' : 'auto'}
						direction="column"
						justify="space-between"
						align="center"
						gap="8"
					>
						<Flex
							direction="column"
							gap="8"
							width={isBigScreen ? 'auto' : '100%'}
						>
							<Flex gap="8" justify="end">
								<Skeleton height="32px" width="100px" margin="4px" />
								<Skeleton height="32px" width="120px" margin="4px" />
							</Flex>
							<Flex justify="end">
								<Skeleton height="16px" width="100px" margin="4px" />
							</Flex>
							<Flex
								width={isSmallestScreen ? '100%' : '500px'}
								direction="column"
								gap="4"
								align="flex-end"
							>
								<Skeleton
									height="24px"
									width={isSmallestScreen ? '100%' : '500px'}
									margin="4px"
								/>
								<Skeleton
									height="24px"
									width={isSmallestScreen ? '100%' : '500px'}
									margin="4px"
								/>
							</Flex>
						</Flex>
						{!isBigScreen && (
							<Flex width={isDesktopOrLaptop ? '340px' : '250px'}>
								<Skeleton
									height={isDesktopOrLaptop ? '340px' : '250px'}
									width={isDesktopOrLaptop ? '340px' : '250px'}
								/>
							</Flex>
						)}
						{showBtns && (
							<Flex justify={isBigScreen ? 'end' : 'center'} gap="24">
								<Skeleton
									width={isDesktopOrLaptop ? '180px' : '150px'}
									height={isDesktopOrLaptop ? '50px' : '32px'}
									borderRadius="8px"
								/>
								<Skeleton
									width={isDesktopOrLaptop ? '180px' : '150px'}
									height={isDesktopOrLaptop ? '50px' : '32px'}
									borderRadius="8px"
								/>
							</Flex>
						)}
					</Flex>
					{isBigScreen && (
						<Flex width={isDesktopOrLaptop ? '340px' : '250px'}>
							<Skeleton
								height={isDesktopOrLaptop ? '340px' : '250px'}
								width={isDesktopOrLaptop ? '340px' : '250px'}
							/>
						</Flex>
					)}
				</Flex>
			</Flex>
		</Card>
	);
});
