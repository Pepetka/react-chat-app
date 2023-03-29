import { Meta, StoryFn } from '@storybook/react';
import { Card } from '@/shared/ui/Card';
import { ChatCardSkeleton } from './ChatCardSkeleton';

export default {
	title: 'entities/Chat/ChatCardSkeleton',
	component: ChatCardSkeleton,
	decorators: [
		(StoryComponent) => {
			return (
				<Card width="100%">
					<StoryComponent />
				</Card>
			);
		},
	],
} as Meta<typeof ChatCardSkeleton>;

const Template: StoryFn<typeof ChatCardSkeleton> = (args) => (
	<ChatCardSkeleton />
);

export const Normal = Template.bind({});
Normal.args = {};