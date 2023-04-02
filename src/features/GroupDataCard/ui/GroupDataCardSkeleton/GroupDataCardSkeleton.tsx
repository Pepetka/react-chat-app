import { memo } from 'react';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

export const GroupDataCardSkeleton = memo(() => {
	return (
		<Card width="100%" height="400px" borderRadius={false}>
			<Flex justify="space-between" height="100%" gap="8">
				<Flex direction="column" justify="space-between">
					<Flex direction="column" gap="8">
						<Flex justify="start">
							<Skeleton height="32px" width="200px" />
						</Flex>
						<Flex justify="start">
							<Skeleton height="16px" width="100px" margin="4px" />
						</Flex>
						<Flex direction="column" gap="4" align="flex-start">
							<Skeleton height="24px" width="70%" margin="4px" />
							<Skeleton height="24px" width="70%" margin="4px" />
						</Flex>
					</Flex>
				</Flex>
				<Flex width="340px">
					<Skeleton height="100%" width="340px" />
				</Flex>
			</Flex>
		</Card>
	);
});
