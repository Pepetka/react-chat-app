import { Meta, StoryFn } from '@storybook/react';
import { GroupDataCard } from './GroupDataCard';

export default {
	title: 'features/GroupDataCard',
	component: GroupDataCard,
} as Meta<typeof GroupDataCard>;

const Template: StoryFn<typeof GroupDataCard> = (args) => (
	<GroupDataCard {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
