import { Meta, StoryFn } from '@storybook/react';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import { Spinner } from './Spinner';

export default {
	title: 'shared/Spinner',
	component: Spinner,
	decorators: [RouterDecorator()],
} as Meta<typeof Spinner>;

const Template: StoryFn<typeof Spinner> = (args) => <Spinner {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	theme: 'primary',
};

export const Invert = Template.bind({});
Invert.args = {
	theme: 'invert',
};
