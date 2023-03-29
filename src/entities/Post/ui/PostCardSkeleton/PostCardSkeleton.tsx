import { memo } from 'react';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import MoreIcon from '@/shared/assets/more.svg';
import CommentIcon from '@/shared/assets/comment.svg';
import LikeIcon from '@/shared/assets/like2.svg';
import DislikeIcon from '@/shared/assets/dislike.svg';
import SpeakerIcon from '@/shared/assets/speaker.svg';

interface IPostCardSkeletonProps {
	admin: boolean;
}

export const PostCardSkeleton = memo((props: IPostCardSkeletonProps) => {
	const { admin } = props;

	return (
		<Card width="100%">
			<Flex direction="column" gap="16">
				<Flex justify="space-between">
					<Flex align="center" gap="8" width="auto">
						<Flex width="85px">
							<Skeleton circle height="85px" width="85px" />
						</Flex>
						<Flex gap="8">
							<Skeleton height="24px" width="100px" margin="4px" />
							<Skeleton height="24px" width="130px" margin="4px" />
						</Flex>
					</Flex>
					{admin && (
						<Button theme="clear" width="64px" height="64px">
							<Icon SvgIcon={MoreIcon} invert />
						</Button>
					)}
				</Flex>
				<Flex justify="space-between">
					<Flex direction="column" width="500px" gap="4">
						<Skeleton height="16px" width="100%" margin="4px" />
						<Skeleton height="16px" width="100%" margin="4px" />
						<Skeleton height="16px" width="100%" margin="4px" />
						<Skeleton height="16px" width="100%" margin="4px" />
						<Skeleton height="16px" width="100%" margin="4px" />
					</Flex>
					<Skeleton height="385px" width="385px" />
				</Flex>
				<Flex align="flex-end" justify="space-between">
					<Skeleton height="16px" width="200px" margin="4px" />
					<Flex gap="24" align="center" width="auto">
						<Flex gap="8" align="center" width="auto">
							<Skeleton height="24px" width="50px" margin="4px" />
							<Button width="64px" height="64px">
								<Icon SvgIcon={CommentIcon} invert />
							</Button>
						</Flex>
						<Flex gap="8" align="center" width="auto">
							<Skeleton height="24px" width="50px" margin="4px" />
							<Button width="64px" height="64px">
								<Icon SvgIcon={LikeIcon} invert />
							</Button>
						</Flex>
						<Flex gap="8" align="center" width="auto">
							<Skeleton height="24px" width="50px" margin="4px" />
							<Button width="64px" height="64px">
								<Icon SvgIcon={DislikeIcon} invert />
							</Button>
						</Flex>
						<Flex gap="8" align="center" width="auto">
							<Skeleton height="24px" width="50px" margin="4px" />
							<Button width="64px" height="64px">
								<Icon SvgIcon={SpeakerIcon} invert />
							</Button>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Card>
	);
});
