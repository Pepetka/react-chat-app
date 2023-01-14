import { Meta, StoryFn } from '@storybook/react';
import { NavBar } from './NavBar';

export default {
	title: 'widgets/NavBar',
	component: NavBar,
} as Meta<typeof NavBar>;

const Template: StoryFn<typeof NavBar> = (args) => <NavBar {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	currentPagePath: '/login',
};
