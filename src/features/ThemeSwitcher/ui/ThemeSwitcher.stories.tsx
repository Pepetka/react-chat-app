import { Meta, StoryFn } from '@storybook/react';
import { ThemeSwitcher } from './ThemeSwitcher';

export default {
	title: 'features/ThemeSwitcher',
	component: ThemeSwitcher,
} as Meta<typeof ThemeSwitcher>;

const Template: StoryFn<typeof ThemeSwitcher> = (args) => (
	<ThemeSwitcher {...args} />
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
