import { Meta, StoryFn } from '@storybook/react';
import image from '@/shared/assets/images/image.jpg';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import { FormWithImg } from './FormWithImg';

export default {
	title: 'shared/FormWithImg',
	component: FormWithImg,
	decorators: [RouterDecorator()],
} as Meta<typeof FormWithImg>;

const Template: StoryFn<typeof FormWithImg> = (args) => (
	<FormWithImg {...args} />
);

export const WithImgArea = Template.bind({});
WithImgArea.args = {
	withImg: true,
	textPlaceholder: 'Text placeholder',
	imgPlaceholder: 'Img placeholder',
};

export const WithImg = Template.bind({});
WithImg.args = {
	withImg: true,
	textPlaceholder: 'Text placeholder',
	imgPlaceholder: 'Img placeholder',
	imgValue: `${image}\n${image}\n${image}`,
	previewImgDefault: true,
};

export const WithoutImgArea = Template.bind({});
WithoutImgArea.args = {
	withImg: false,
	textPlaceholder: 'Text placeholder',
};
