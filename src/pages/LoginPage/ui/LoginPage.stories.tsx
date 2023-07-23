import { Meta, StoryFn } from '@storybook/react';
import {
	PageDecorator,
	RouterDecorator,
} from '@/shared/config/storybook/decorators';
import LoginPage from './LoginPage';

export default {
	title: 'pages/LoginPage',
	component: LoginPage,
	decorators: [RouterDecorator(), PageDecorator()],
} as Meta<typeof LoginPage>;

const Template: StoryFn<typeof LoginPage> = (args) => <LoginPage />;

export const Normal = Template.bind({});
Normal.args = {};
