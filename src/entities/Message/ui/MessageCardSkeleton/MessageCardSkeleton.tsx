import { memo } from 'react';
import { Flex } from '@/shared/ui/Flex';
import { Card } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';

export const MessageCardSkeleton = memo(() => {
	return (
		<Card width="300px" border>
			<Flex direction="column" gap="8">
				<Flex gap="8">
					<Skeleton height="24px" width="80px" margin="4px" />
					<Skeleton height="24px" width="100px" margin="4px" />
				</Flex>
				<Skeleton height="36px" width="100%" margin="4px" />
				<Skeleton height="16px" width="50px" margin="4px" />
			</Flex>
		</Card>
	);
});
