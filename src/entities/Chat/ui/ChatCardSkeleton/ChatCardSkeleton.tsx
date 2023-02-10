import { memo } from 'react';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
export const ChatCardSkeleton = memo(() => {
	return (
		<Flex gap="8">
			<Flex width="100px" height="100px">
				<Skeleton height="100px" width="100px" circle />
			</Flex>
			<Flex direction="column" width="calc(100% - 100px)" gap="4">
				<Flex>
					<Flex gap="8">
						<Skeleton height="24px" width="100px" margin="4px" />
						<Skeleton height="24px" width="120px" margin="4px" />
					</Flex>
					<Skeleton height="16px" width="170px" margin="4px" />
				</Flex>
				<Skeleton height="16px" width="95%" margin="4px" />
			</Flex>
		</Flex>
	);
});
