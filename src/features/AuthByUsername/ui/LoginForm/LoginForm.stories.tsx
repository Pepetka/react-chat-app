import { Meta, StoryFn } from '@storybook/react';
import { RouterDecorator } from '@/shared/config/storybook/decorators';
import { LoginForm } from './LoginForm';

export default {
	title: 'features/AuthByUsername/LoginForm',
	component: LoginForm,
	decorators: [RouterDecorator()],
} as Meta<typeof LoginForm>;

const Template: StoryFn<typeof LoginForm> = (args) => <LoginForm />;

export const Normal = Template.bind({});
