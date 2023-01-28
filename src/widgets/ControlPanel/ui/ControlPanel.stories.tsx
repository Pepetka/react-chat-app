import { Meta, StoryFn } from '@storybook/react';
import { ControlPanel } from './ControlPanel';

export default {
	title: 'widgets/ControlPanel',
	component: ControlPanel,
} as Meta<typeof ControlPanel>;

const Template: StoryFn<typeof ControlPanel> = (args) => <ControlPanel />;

export const Normal = Template.bind({});
