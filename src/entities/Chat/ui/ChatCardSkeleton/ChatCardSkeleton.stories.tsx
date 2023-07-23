import { Meta, StoryFn } from '@storybook/react';
import { Card } from '@/shared/ui/Card';
import { RouterDecorator } from '@/shared/config/storybook/decorators';
import { ChatCardSkeleton } from './ChatCardSkeleton';

export default {
	title: 'entities/Chat/ChatCardSkeleton',
	component: ChatCardSkeleton,
	decorators: [
		RouterDecorator(),
		(StoryComponent) => {
			return (
				<Card width="100%">
					<StoryComponent />
				</Card>
			);
		},
	],
} as Meta<typeof ChatCardSkeleton>;

const Template: StoryFn<typeof ChatCardSkeleton> = () => <ChatCardSkeleton />;

export const Normal = Template.bind({});
Normal.args = {};
