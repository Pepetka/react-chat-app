import { Meta, StoryFn } from '@storybook/react';
import { Card } from '@/shared/ui/Card';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import { FriendForm } from './FriendForm';

export default {
	title: 'entities/Friend/FriendForm',
	component: FriendForm,
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
} as Meta<typeof FriendForm>;

const Template: StoryFn<typeof FriendForm> = (args) => <FriendForm {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
