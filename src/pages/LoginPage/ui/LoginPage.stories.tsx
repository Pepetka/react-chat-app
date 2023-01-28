import { Meta, StoryFn } from '@storybook/react';
import LoginPage from './LoginPage';

export default {
	title: 'pages/LoginPage',
	component: LoginPage,
} as Meta<typeof LoginPage>;

const Template: StoryFn<typeof LoginPage> = (args) => <LoginPage />;

export const Normal = Template.bind({});
Normal.args = {};
