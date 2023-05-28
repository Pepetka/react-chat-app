import { memo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

export const GroupDataCardSkeleton = memo(() => {
	const isDesktopOrLaptop = useMediaQuery({ minWidth: 1200 });
	const isSmallestScreen = useMediaQuery({ maxWidth: 540 });

	return (
		<Card width="100%" minHeight="400px" borderRadius={false}>
			<Flex
				wrap={isDesktopOrLaptop ? 'nowrap' : 'wrap'}
				justify="center"
				height="100%"
				gap="8"
			>
				<Flex direction="column" justify="space-between">
					<Flex direction="column" gap="8">
						<Flex justify="start">
							<Skeleton height="32px" width="200px" />
						</Flex>
						<Flex justify="start">
							<Skeleton height="16px" width="100px" margin="4px" />
						</Flex>
						<Flex
							width={isSmallestScreen ? '100%' : '500px'}
							direction="column"
							gap="4"
							align="flex-start"
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
				</Flex>
				<Flex
					width={isDesktopOrLaptop ? '340px' : '250px'}
					height={isDesktopOrLaptop ? '340px' : '250px'}
				>
					<Skeleton
						width={isDesktopOrLaptop ? '340px' : '250px'}
						height={isDesktopOrLaptop ? '340px' : '250px'}
					/>
				</Flex>
			</Flex>
		</Card>
	);
});
