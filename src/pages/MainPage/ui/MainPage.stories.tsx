import { Meta, StoryFn } from '@storybook/react';
import MainPage from './MainPage';

export default {
	title: 'pages/MainPage',
	component: MainPage,
} as Meta<typeof MainPage>;

const Template: StoryFn<typeof MainPage> = (args) => <MainPage />;

export const Normal = Template.bind({});
Normal.args = {};
