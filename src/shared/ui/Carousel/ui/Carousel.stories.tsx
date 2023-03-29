import { Meta, StoryFn } from '@storybook/react';
import image from '@/shared/assets/images/image.jpg';
import { Flex } from '@/shared/ui/Flex';
import { Carousel } from './Carousel';

export default {
	title: 'shared/Carousel',
	component: Carousel,
	decorators: [
		(StoryComponent) => (
			<Flex justify="center">
				<StoryComponent />
			</Flex>
		),
	],
} as Meta<typeof Carousel>;

const Template: StoryFn<typeof Carousel> = (args) => <Carousel {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	carouselWidth: '385px',
	arrows: true,
	imgArray: [image, image, image],
};
