import { Meta, StoryFn } from '@storybook/react';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import RegisterPage from './RegisterPage';

export default {
	title: 'pages/RegisterPage',
	component: RegisterPage,
	decorators: [RouterDecorator()],
} as Meta<typeof RegisterPage>;

const Template: StoryFn<typeof RegisterPage> = (args) => <RegisterPage />;

export const Normal = Template.bind({});
Normal.args = {};
