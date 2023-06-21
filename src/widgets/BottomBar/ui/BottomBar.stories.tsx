import { Meta, StoryFn } from '@storybook/react';
import { BottomBar } from './BottomBar';

export default {
	title: 'widgets/BottomBar',
	component: BottomBar,
} as Meta<typeof BottomBar>;

const Template: StoryFn<typeof BottomBar> = (args) => <BottomBar {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
