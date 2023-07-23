import { Meta, StoryFn } from '@storybook/react';
import {
	RouterDecorator,
	PageDecorator,
} from '@/shared/config/storybook/decorators';
import MainPage from './MainPage';

export default {
	title: 'pages/MainPage',
	component: MainPage,
	decorators: [RouterDecorator(), PageDecorator()],
} as Meta<typeof MainPage>;

const Template: StoryFn<typeof MainPage> = (args) => <MainPage />;

export const Normal = Template.bind({});
Normal.args = {};
