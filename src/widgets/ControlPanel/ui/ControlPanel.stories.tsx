import { Meta, StoryFn } from '@storybook/react';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import { ControlPanel } from './ControlPanel';

export default {
	title: 'widgets/ControlPanel',
	component: ControlPanel,
	decorators: [RouterDecorator()],
} as Meta<typeof ControlPanel>;

const Template: StoryFn<typeof ControlPanel> = (args) => <ControlPanel />;

export const Normal = Template.bind({});
