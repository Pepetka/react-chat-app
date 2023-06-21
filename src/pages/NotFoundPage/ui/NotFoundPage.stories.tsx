import { Meta, StoryFn } from '@storybook/react';
import NotFoundPage from './NotFoundPage';

export default {
	title: 'pages/NotFoundPage',
	component: NotFoundPage,
} as Meta<typeof NotFoundPage>;

const Template: StoryFn<typeof NotFoundPage> = (args) => <NotFoundPage />;

export const Normal = Template.bind({});
