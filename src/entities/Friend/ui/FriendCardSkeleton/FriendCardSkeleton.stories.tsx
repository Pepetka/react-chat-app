import { Meta, StoryFn } from '@storybook/react';
import { Card } from '@/shared/ui/Card';
import { FriendCardSkeleton } from './FriendCardSkeleton';

export default {
	title: 'entities/Friend/FriendCardSkeleton',
	component: FriendCardSkeleton,
	decorators: [
		(StoryComponent) => {
			return (
				<Card width="100%">
					<StoryComponent />
				</Card>
			);
		},
	],
} as Meta<typeof FriendCardSkeleton>;

const Template: StoryFn<typeof FriendCardSkeleton> = () => (
	<FriendCardSkeleton />
);

export const Normal = Template.bind({});
Normal.args = {};
