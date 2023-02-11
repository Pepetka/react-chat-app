import { Meta, StoryFn } from '@storybook/react';
import MessengerPage from './MessengerPage';

export default {
	title: 'pages/MessengerPage',
	component: MessengerPage,
} as Meta<typeof MessengerPage>;

const Template: StoryFn<typeof MessengerPage> = (args) => <MessengerPage />;

export const Normal = Template.bind({});
