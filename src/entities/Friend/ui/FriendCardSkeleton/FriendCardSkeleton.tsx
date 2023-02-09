import { memo } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Flex } from '@/shared/ui/Flex';

export const FriendCardSkeleton = memo(() => {
	return (
		<Flex gap="4" direction="column">
			<Flex gap="8" align="center">
				<Flex width="50px">
					<Skeleton height="50px" width="50px" circle />
				</Flex>
				<Flex gap="8">
					<Skeleton height="24px" width="80px" margin="4px" />
					<Skeleton height="24px" width="120px" margin="4px" />
				</Flex>
			</Flex>
			<Skeleton height="2px" width="0px" />
		</Flex>
	);
});
