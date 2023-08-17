import { Meta, StoryFn } from '@storybook/react';
import { RouterDecorator } from '@/shared/config/storybook/decorators';
import { EditProfileButton } from './EditProfileButton';

export default {
	title: 'features/EditProfileButton',
	component: EditProfileButton,
	decorators: [RouterDecorator()],
} as Meta<typeof EditProfileButton>;

const Template: StoryFn<typeof EditProfileButton> = (args) => (
	<EditProfileButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
	theme: 'primary',
};

export const PrimaryInvert = Template.bind({});
PrimaryInvert.args = {
	theme: 'primary',
	invert: true,
};

export const Outline = Template.bind({});
Outline.args = {
	theme: 'outline',
};

export const OutlineInvert = Template.bind({});
OutlineInvert.args = {
	theme: 'outline',
	invert: true,
};
