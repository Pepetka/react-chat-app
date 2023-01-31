import { Meta, StoryFn } from '@storybook/react';
import { Skeleton } from './Skeleton';
import { RouterDecorator } from '@/shared/config/storybook/RouterDecorator/RouterDecorator';

export default {
	title: 'shared/Skeleton',
	component: Skeleton,
	decorators: [RouterDecorator()],
} as Meta<typeof Skeleton>;

const Template: StoryFn<typeof Skeleton> = (args) => <Skeleton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	width: '200px',
	height: '50px',
};

export const PrimaryCircle = Template.bind({});
PrimaryCircle.args = {
	width: '50px',
	height: '50px',
	circle: true,
};

export const Invert = Template.bind({});
Invert.args = {
	width: '200px',
	height: '50px',
	invert: true,
};

export const InvertCircle = Template.bind({});
InvertCircle.args = {
	width: '50px',
	height: '50px',
	invert: true,
	circle: true,
};
