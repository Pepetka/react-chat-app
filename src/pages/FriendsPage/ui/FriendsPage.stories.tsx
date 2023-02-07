import { Meta, StoryFn } from '@storybook/react';
import FriendsPage from './FriendsPage';

export default {
	title: 'pages/FriendsPage',
	component: FriendsPage,
} as Meta<typeof FriendsPage>;

const Template: StoryFn<typeof FriendsPage> = (args) => <FriendsPage />;

export const Normal = Template.bind({});
