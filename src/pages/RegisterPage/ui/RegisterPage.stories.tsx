import { Meta, StoryFn } from '@storybook/react';
import {
	RouterDecorator,
	PageDecorator,
} from '@/shared/config/storybook/decorators';
import RegisterPage from './RegisterPage';

export default {
	title: 'pages/RegisterPage',
	component: RegisterPage,
	decorators: [RouterDecorator(), PageDecorator()],
} as Meta<typeof RegisterPage>;

const Template: StoryFn<typeof RegisterPage> = (args) => <RegisterPage />;

export const Normal = Template.bind({});
Normal.args = {};
