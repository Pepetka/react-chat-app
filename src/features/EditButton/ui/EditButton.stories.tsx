import { Meta, StoryFn } from '@storybook/react';
import { RouterDecorator } from '@/shared/config/storybook/decorators';
import { EditButton } from './EditButton';

export default {
	title: 'features/EditButton',
	component: EditButton,
	decorators: [RouterDecorator()],
} as Meta<typeof EditButton>;

const Template: StoryFn<typeof EditButton> = (args) => <EditButton {...args} />;

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
