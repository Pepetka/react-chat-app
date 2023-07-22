import { Meta, StoryFn } from '@storybook/react';
import { Card } from '@/shared/ui/Card';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import { ChatForm } from './ChatForm';

export default {
	title: 'entities/Chat/ChatForm',
	component: ChatForm,
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
} as Meta<typeof ChatForm>;

const Template: StoryFn<typeof ChatForm> = (args) => <ChatForm {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
