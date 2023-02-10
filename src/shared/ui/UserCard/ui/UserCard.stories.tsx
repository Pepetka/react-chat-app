import { Meta, StoryFn } from '@storybook/react';
import { UserCard } from './UserCard';
import image from '@/shared/assets/images/image.jpg';

export default {
	title: 'shared/UserCard',
	component: UserCard,
} as Meta<typeof UserCard>;

const Template: StoryFn<typeof UserCard> = (args) => <UserCard {...args} />;

const user = {
	id: '1',
	firstname: 'Ivan',
	lastname: 'Ivanov',
	avatar: image,
};

export const Normal = Template.bind({});
Normal.args = {
	user,
	theme: 'primary',
};

export const WithAdditionalText = Template.bind({});
WithAdditionalText.args = {
	user,
	theme: 'primary',
	additionalText: 'Some text',
};
