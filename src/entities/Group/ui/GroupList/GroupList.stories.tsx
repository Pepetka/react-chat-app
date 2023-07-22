import { Meta, StoryFn } from '@storybook/react';
import image from '@/shared/assets/images/image.jpg';
import { Card } from '@/shared/ui/Card';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import { Group } from '../../model/types/groupSchema';
import { GroupList } from './GroupList';

export default {
	title: 'entities/Group/GroupList',
	component: GroupList,
	decorators: [
		RouterDecorator(),
		(StoryComponent) => {
			return (
				<Card width="100%">
					<StoryComponent />
				</Card>
			);
		},
	],
} as Meta<typeof GroupList>;

const Template: StoryFn<typeof GroupList> = (args) => <GroupList {...args} />;

const groups: Array<Group> = [
	{
		id: '0',
		ownerId: '1',
		tags: ['IT'],
		createdAt: '14:21 13.02.2023',
		description: 'Some group description',
		name: 'Group name',
		avatar: image,
	},
	{
		id: '1',
		ownerId: '1',
		tags: ['IT'],
		createdAt: '14:21 13.02.2023',
		description: 'Some group description',
		name: 'Group name',
		avatar: image,
	},
	{
		id: '2',
		ownerId: '1',
		tags: ['IT'],
		createdAt: '14:21 13.02.2023',
		description: 'Some group description',
		name: 'Group name',
		avatar: image,
	},
];

export const Normal = Template.bind({});
Normal.args = {
	groups,
};

export const Loading = Template.bind({});
Loading.args = {
	isLoading: true,
};

export const Error = Template.bind({});
Error.args = {
	isError: true,
};
