import { Meta, StoryFn } from '@storybook/react';
import { RouterDecorator } from '@/shared/config/storybook/decorators';
import { CreateButton } from './CreateButton';

export default {
	title: 'features/CreateButton',
	component: CreateButton,
	decorators: [RouterDecorator()],
} as Meta<typeof CreateButton>;

const Template: StoryFn<typeof CreateButton> = (args) => (
	<CreateButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
	theme: 'primary',
	path: '/',
};

export const PrimaryInvert = Template.bind({});
PrimaryInvert.args = {
	theme: 'primary',
	invert: true,
	path: '/',
};

export const Outline = Template.bind({});
Outline.args = {
	theme: 'outline',
	path: '/',
};

export const OutlineInvert = Template.bind({});
OutlineInvert.args = {
	theme: 'outline',
	invert: true,
	path: '/',
};
