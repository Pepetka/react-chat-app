import { Meta, StoryFn } from '@storybook/react';
import { Card } from '@/shared/ui/Card';
import { ChatForm } from './ChatForm';

export default {
	title: 'entities/Chat/ChatForm',
	component: ChatForm,
	decorators: [
		(StoryComponent) => {
			return (
				<Card width="100%">
					<StoryComponent />
				</Card>
			);
		},
	],
} as Meta<typeof ChatForm>;

const Template: StoryFn<typeof ChatForm> = (args) => <ChatForm {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
