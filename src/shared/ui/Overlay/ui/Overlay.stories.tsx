import { Meta, StoryFn } from '@storybook/react';
import { Overlay } from './Overlay';

export default {
	title: 'shared/Overlay',
	component: Overlay,
} as Meta<typeof Overlay>;

const Template: StoryFn<typeof Overlay> = (args) => <Overlay {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
