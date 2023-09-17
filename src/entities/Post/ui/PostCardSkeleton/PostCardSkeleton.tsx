import { FC, memo, SVGProps, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
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
	withComments?: boolean;
	height?: number;
}

export const PostCardSkeleton = memo((props: IPostCardSkeletonProps) => {
	const { admin, withComments = true } = props;
	const isDesktopOrLaptop = useMediaQuery({ minWidth: 1200 });
	const isSmallScreen = useMediaQuery({ maxWidth: 992 });
	const isSmallestScreen = useMediaQuery({ maxWidth: 425 });

	const postButtons: Array<{
		name: string;
		icon: FC<SVGProps<SVGSVGElement>>;
		condition: boolean;
	}> = useMemo(
		() => [
			{
				name: 'comments',
				icon: CommentIcon,
				condition: withComments,
			},
			{
				name: 'likes',
				icon: LikeIcon,
				condition: true,
			},
			{
				name: 'dislikes',
				icon: DislikeIcon,
				condition: true,
			},
			{
				name: 'shared',
				icon: SpeakerIcon,
				condition: true,
			},
		],
		[withComments],
	);

	return (
		<Card width="100%">
			<Flex direction="column" gap="16">
				<Flex justify="space-between">
					<Flex align="center" gap="8" width="auto">
						<Flex width={isSmallScreen ? '50px' : '85px'}>
							<Skeleton
								circle
								height={isSmallScreen ? '50px' : '85px'}
								width={isSmallScreen ? '50px' : '85px'}
							/>
						</Flex>
						<Flex gap="8">
							<Skeleton
								height={isSmallScreen ? '16px' : '24px'}
								width="50px"
								margin="4px"
							/>
							<Skeleton
								height={isSmallScreen ? '16px' : '24px'}
								width="80px"
								margin="4px"
							/>
						</Flex>
					</Flex>
					{admin && (
						<Button
							aria-label="Post settings"
							theme="clear"
							width={isSmallScreen ? '40px' : '64px'}
							height={isSmallScreen ? '40px' : '64px'}
						>
							<Icon SvgIcon={MoreIcon} invert />
						</Button>
					)}
				</Flex>
				<Flex wrap="wrap" justify="space-between">
					<Flex
						direction="column"
						width={isSmallScreen ? '100%' : '50%'}
						gap="4"
					>
						<Skeleton height="16px" width="100%" margin="4px" />
						<Skeleton height="16px" width="100%" margin="4px" />
						<Skeleton height="16px" width="100%" margin="4px" />
						<Skeleton height="16px" width="100%" margin="4px" />
						<Skeleton height="16px" width="100%" margin="4px" />
					</Flex>
					<Skeleton width={isSmallestScreen ? '100%' : '385px'} square />
				</Flex>
				<Flex
					direction={isDesktopOrLaptop ? 'row' : 'column'}
					align={isDesktopOrLaptop ? 'flex-end' : 'flex-start'}
					justify="space-between"
				>
					<Skeleton height="16px" width="150px" margin="4px" />
					<Flex
						gap="24"
						align="center"
						justify="center"
						width={isDesktopOrLaptop ? 'auto' : '100%'}
					>
						{postButtons.map(
							({ name, condition, icon }) =>
								condition && (
									<Flex
										key={name}
										direction={isSmallScreen ? 'column' : 'row'}
										gap="8"
										align="center"
										width="auto"
									>
										<Skeleton height="24px" width="50px" margin="4px" />
										<Button
											aria-label={`Post ${name} button`}
											width={isSmallScreen ? '40px' : '64px'}
											height={isSmallScreen ? '40px' : '64px'}
										>
											<Icon SvgIcon={icon} invert />
										</Button>
									</Flex>
								),
						)}
					</Flex>
				</Flex>
			</Flex>
		</Card>
	);
});
