import { Meta, StoryFn } from '@storybook/react';
import image from '@/shared/assets/images/image.jpg';
import { Card } from '@/shared/ui/Card';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import { Group } from '../../model/types/groupSchema';
import { GroupCard } from './GroupCard';

export default {
	title: 'entities/Group/GroupCard',
	component: GroupCard,
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
} as Meta<typeof GroupCard>;

const Template: StoryFn<typeof GroupCard> = (args) => <GroupCard {...args} />;

const group: Group = {
	id: '0',
	ownerId: '1',
	tags: ['IT'],
	createdAt: '14:21 13.02.2023',
	description: 'Some group description',
	name: 'Group name',
	avatar: image,
};

export const Normal = Template.bind({});
Normal.args = {
	group,
};
