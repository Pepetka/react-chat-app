import { Meta, StoryFn } from '@storybook/react';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import MainPage from './MainPage';

export default {
	title: 'pages/MainPage',
	component: MainPage,
	decorators: [RouterDecorator()],
} as Meta<typeof MainPage>;

const Template: StoryFn<typeof MainPage> = (args) => <MainPage />;

export const Normal = Template.bind({});
Normal.args = {};
