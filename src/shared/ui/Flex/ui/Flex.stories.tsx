import { Meta, StoryFn } from '@storybook/react';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import { Flex } from './Flex';

export default {
	title: 'shared/Flex',
	component: Flex,
	decorators: [RouterDecorator()],
	argTypes: {
		gap: {
			options: ['4', '8', '16', '24', '32', '40'],
			control: { type: 'select' },
		},
		justify: {
			options: ['center', 'start', 'end', 'space-between', 'space-around'],
			control: { type: 'select' },
		},
		align: {
			options: ['center', 'flex-start', 'flex-end'],
			control: { type: 'select' },
		},
	},
} as Meta<typeof Flex>;

const Template: StoryFn<typeof Flex> = (args) => <Flex {...args} />;

const FlexItems = () => (
	<>
		<p>Flex 1</p>
		<p>Flex 2</p>
		<p>Flex 3</p>
		<p>Flex 4</p>
		<p>Flex 5</p>
	</>
);

export const Row = Template.bind({});
Row.args = {
	children: <FlexItems />,
	direction: 'row',
	gap: '4',
};

export const Column = Template.bind({});
Column.args = {
	children: <FlexItems />,
	direction: 'column',
	gap: '4',
};
