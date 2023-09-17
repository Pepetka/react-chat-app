import { memo } from 'react';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import MoreIcon from '@/shared/assets/more.svg';

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
						<Skeleton height="16px" width="80px" margin="4px" />
						<Skeleton height="16px" width="100px" margin="4px" />
					</Flex>
				</Flex>
				{admin && (
					<Button
						aria-label="Comment settings"
						theme="clear"
						width="48px"
						height="48px"
					>
						<Icon SvgIcon={MoreIcon} invert />
					</Button>
				)}
			</Flex>
			<Skeleton height="16px" width="500px" margin="4px" />
			<Skeleton height="16px" width="100px" margin="4px" />
		</Flex>
	);
});
