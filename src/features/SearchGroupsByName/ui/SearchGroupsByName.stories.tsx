import { Meta, StoryFn } from '@storybook/react';
import { SearchGroupsByName } from './SearchGroupsByName';

export default {
	title: 'features/SearchGroupsByName',
	component: SearchGroupsByName,
} as Meta<typeof SearchGroupsByName>;

const Template: StoryFn<typeof SearchGroupsByName> = (args) => (
	<SearchGroupsByName {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
