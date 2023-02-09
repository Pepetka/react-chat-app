import { Meta, StoryFn } from '@storybook/react';
import { FriendForm } from './FriendForm';
import { Card } from '@/shared/ui/Card';

export default {
	title: 'entities/Friend/FriendForm',
	component: FriendForm,
	decorators: [
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
