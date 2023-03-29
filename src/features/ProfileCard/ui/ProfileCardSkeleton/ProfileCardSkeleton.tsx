import { memo } from 'react';
import { Flex } from '@/shared/ui/Flex';
import { Card } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';

interface IProfileCardSkeletonProps {
	showBtns: boolean;
}

export const ProfileCardSkeleton = memo((props: IProfileCardSkeletonProps) => {
	const { showBtns } = props;

	return (
		<Card width="100%" height="400px" borderRadius={false}>
			<Flex height="100%" gap="8">
				<Flex width="20%">
					<Skeleton height="24px" width="100px" />
				</Flex>
				<Flex
					direction="column"
					justify="space-between"
					width="calc(80% - 340px)"
				>
					<Flex direction="column" gap="8">
						<Flex gap="8" justify="end">
							<Skeleton height="32px" width="150px" margin="4px" />
							<Skeleton height="32px" width="200px" margin="4px" />
						</Flex>
						<Flex justify="end">
							<Skeleton height="16px" width="100px" margin="4px" />
						</Flex>
						<Flex direction="column" gap="4" align="flex-end">
							<Skeleton height="24px" width="70%" margin="4px" />
							<Skeleton height="24px" width="70%" margin="4px" />
						</Flex>
					</Flex>
					{showBtns && (
						<Flex justify="end" gap="24">
							<Skeleton width="180px" height="50px" borderRadius="8px" />
							<Skeleton width="180px" height="50px" borderRadius="8px" />
						</Flex>
					)}
				</Flex>
				<Flex width="340px">
					<Skeleton height="100%" width="340px" />
				</Flex>
			</Flex>
		</Card>
	);
});
