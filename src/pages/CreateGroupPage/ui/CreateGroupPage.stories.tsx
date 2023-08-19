import { Meta, StoryFn } from '@storybook/react';
import { RouterDecorator } from '@/shared/config/storybook/decorators';
import CreateGroupPage from './CreateGroupPage';

export default {
	title: 'pages/CreateGroupPage',
	component: CreateGroupPage,
	decorators: [RouterDecorator()],
} as Meta<typeof CreateGroupPage>;

const Template: StoryFn<typeof CreateGroupPage> = (args) => <CreateGroupPage />;

export const Normal = Template.bind({});
