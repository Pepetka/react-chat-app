import { Meta, StoryFn } from '@storybook/react';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import LoginPage from './LoginPage';

export default {
	title: 'pages/LoginPage',
	component: LoginPage,
	decorators: [RouterDecorator()],
} as Meta<typeof LoginPage>;

const Template: StoryFn<typeof LoginPage> = (args) => <LoginPage />;

export const Normal = Template.bind({});
Normal.args = {};
