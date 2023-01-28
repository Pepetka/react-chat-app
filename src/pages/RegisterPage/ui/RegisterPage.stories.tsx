import { Meta, StoryFn } from '@storybook/react';
import RegisterPage from './RegisterPage';

export default {
	title: 'pages/RegisterPage',
	component: RegisterPage,
} as Meta<typeof RegisterPage>;

const Template: StoryFn<typeof RegisterPage> = (args) => <RegisterPage />;

export const Normal = Template.bind({});
Normal.args = {};