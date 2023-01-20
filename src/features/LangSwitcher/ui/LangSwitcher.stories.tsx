import { Meta, StoryFn } from '@storybook/react';
import { LangSwitcher } from './LangSwitcher';

export default {
	title: 'features/LangSwitcher',
	component: LangSwitcher,
} as Meta<typeof LangSwitcher>;

const Template: StoryFn<typeof LangSwitcher> = (args) => (
	<LangSwitcher {...args} />
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
