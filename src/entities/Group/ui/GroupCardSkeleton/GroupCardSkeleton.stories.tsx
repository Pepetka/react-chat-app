import { Meta, StoryFn } from '@storybook/react';
import { Card } from '@/shared/ui/Card';
import { RouterDecorator } from '@/shared/config/storybook/decorators';
import { GroupCardSkeleton } from './GroupCardSkeleton';

export default {
	title: 'entities/Group/GroupCardSkeleton',
	component: GroupCardSkeleton,
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
} as Meta<typeof GroupCardSkeleton>;

const Template: StoryFn<typeof GroupCardSkeleton> = (args) => (
	<GroupCardSkeleton />
);

export const Normal = Template.bind({});
Normal.args = {};
