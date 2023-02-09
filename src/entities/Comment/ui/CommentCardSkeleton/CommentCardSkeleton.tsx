import { Flex } from '@/shared/ui/Flex';
import { memo } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Button } from '@/shared/ui/Button';
import MoreIcon from '@/shared/assets/more.svg';
import { Icon } from '@/shared/ui/Icon';

interface ICommentCardSkeletonProps {
	admin: boolean;
}

export const CommentCardSkeleton = memo((props: ICommentCardSkeletonProps) => {
	const { admin } = props;

	return (
		<Flex direction="column" gap="8">
			<Flex justify="space-between">
				<Flex align="center" gap="8">
					<Flex width="50px">
						<Skeleton circle height="50px" width="50px" />
					</Flex>
					<Flex gap="8">
						<Skeleton height="16px" width="100px" margin="4px" />
						<Skeleton height="16px" width="130px" margin="4px" />
					</Flex>
				</Flex>
				{admin && (
					<Button theme="clear" width="48px" height="48px">
						<Icon SvgIcon={MoreIcon} invert />
					</Button>
				)}
			</Flex>
			<Skeleton height="16px" width="500px" margin="4px" />
			<Skeleton height="16px" width="100px" margin="4px" />
		</Flex>
	);
});
