import { Meta, StoryFn } from '@storybook/react';
import { Overlay } from './Overlay';
import { RouterDecorator } from '@/shared/config/storybook/RouterDecorator/RouterDecorator';

export default {
	title: 'shared/Overlay',
	component: Overlay,
	decorators: [RouterDecorator()],
} as Meta<typeof Overlay>;

const Template: StoryFn<typeof Overlay> = (args) => <Overlay {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
