import { Meta, StoryFn } from '@storybook/react';
import image from '@/shared/assets/images/image.jpg';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import { UserCard } from './UserCard';

export default {
	title: 'shared/UserCard',
	component: UserCard,
	decorators: [RouterDecorator()],
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
	id: user.id,
	name: `${user.firstname} ${user.lastname}`,
	avatar: user.avatar,
	theme: 'primary',
};

export const WithAdditionalText = Template.bind({});
WithAdditionalText.args = {
	id: user.id,
	name: `${user.firstname} ${user.lastname}`,
	avatar: user.avatar,
	theme: 'primary',
	additionalText: 'Some text',
};
