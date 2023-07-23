import { Meta, StoryFn } from '@storybook/react';
import { RouterDecorator } from '@/shared/config/storybook/decorators';
import { MessageForm } from './MessageForm';

export default {
	title: 'entities/Message/MessageForm',
	component: MessageForm,
	decorators: [RouterDecorator()],
} as Meta<typeof MessageForm>;

const Template: StoryFn<typeof MessageForm> = (args) => (
	<MessageForm {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
