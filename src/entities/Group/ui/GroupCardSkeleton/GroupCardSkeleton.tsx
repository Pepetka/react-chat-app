import { memo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

export const GroupCardSkeleton = memo(() => {
	const isSmallScreen = useMediaQuery({ maxWidth: 768 });

	return (
		<Flex gap="8">
			<Flex
				width={isSmallScreen ? '85px' : '100px'}
				height={isSmallScreen ? '85px' : '100px'}
			>
				<Skeleton
					width={isSmallScreen ? '85px' : '100px'}
					height={isSmallScreen ? '85px' : '100px'}
					circle
				/>
			</Flex>
			<Flex direction="column" width="calc(100% - 100px)" gap="4">
				<Flex>
					<Flex gap="8">
						<Skeleton
							height={isSmallScreen ? '16px' : '24px'}
							width="80px"
							margin="4px"
						/>
					</Flex>
					<Skeleton height="16px" width="170px" margin="4px" />
				</Flex>
				<Skeleton height="16px" width="95%" margin="4px" />
			</Flex>
		</Flex>
	);
});
