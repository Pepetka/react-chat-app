import { Meta, StoryFn } from '@storybook/react';
import { Card } from '@/shared/ui/Card';
import { RouterDecorator } from '@/shared/config/storybook/decorators';
import { CommentCardSkeleton } from './CommentCardSkeleton';

export default {
	title: 'entities/Comment/CommentCardSkeleton',
	component: CommentCardSkeleton,
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
} as Meta<typeof CommentCardSkeleton>;

const Template: StoryFn<typeof CommentCardSkeleton> = (args) => (
	<CommentCardSkeleton {...args} />
);

export const WithSettings = Template.bind({});
WithSettings.args = {
	admin: true,
};

export const WithoutSettings = Template.bind({});
WithoutSettings.args = {
	admin: false,
};
