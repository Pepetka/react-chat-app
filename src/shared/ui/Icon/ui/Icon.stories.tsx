import { Meta, StoryFn } from '@storybook/react';
import LogoSvg from '@/shared/assets/logo.svg';
import { Icon } from './Icon';

export default {
	title: 'shared/Icon',
	component: Icon,
} as Meta<typeof Icon>;

const Template: StoryFn<typeof Icon> = (args) => <Icon {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	SvgIcon: LogoSvg,
};

export const Invert = Template.bind({});
Invert.args = {
	SvgIcon: LogoSvg,
	invert: true,
};
