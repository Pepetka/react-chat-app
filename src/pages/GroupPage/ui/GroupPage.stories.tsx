import { Meta, StoryFn } from '@storybook/react';
import GroupPage from './GroupPage';

export default {
	title: 'pages/GroupPage',
	component: GroupPage,
} as Meta<typeof GroupPage>;

const Template: StoryFn<typeof GroupPage> = (args) => <GroupPage />;

export const Normal = Template.bind({});
