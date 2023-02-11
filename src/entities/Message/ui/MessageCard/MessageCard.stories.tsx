import { Meta, StoryFn } from '@storybook/react';
import image from '@/shared/assets/images/image.jpg';
import { MessageCard } from './MessageCard';

export default {
	title: 'entities/Message/MessageCard',
	component: MessageCard,
} as Meta<typeof MessageCard>;

const Template: StoryFn<typeof MessageCard> = (args) => (
	<MessageCard {...args} />
);

const message = {
	text:
		'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab corporis delectus, dolore est fuga illum' +
		' ipsum laborum natus nesciunt odit perferendis quam quas, quasi, quisquam tempora tempore tenetur vel veniam.',
	time: '15:00',
	name: 'Ivan Ivanov',
};

export const Normal = Template.bind({});
Normal.args = {
	admin: true,
	message,
};

export const NormalWithImg = Template.bind({});
NormalWithImg.args = {
	admin: true,
	message: { ...message, img: [image, image, image] },
};

export const FriendMessage = Template.bind({});
FriendMessage.args = {
	admin: false,
	message,
};

export const FriendMessageWithImg = Template.bind({});
FriendMessageWithImg.args = {
	admin: false,
	message: { ...message, img: [image, image, image] },
};
