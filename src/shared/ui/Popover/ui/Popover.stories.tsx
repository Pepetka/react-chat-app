import { Meta, StoryFn } from '@storybook/react';
import { Flex } from '@/shared/ui/Flex';
import { Popover } from './Popover';

export default {
	title: 'shared/Popover',
	component: Popover,
	decorators: [
		(StoryComponent) => {
			return (
				<Flex height="300px" justify="center" align="center">
					<StoryComponent />
				</Flex>
			);
		},
	],
} as Meta<typeof Popover>;

const Template: StoryFn<typeof Popover> = (args) => <Popover {...args} />;

export const BottomRight = Template.bind({});
BottomRight.args = {
	children: (
		<Flex direction="column" gap="16" width="100px" align="center">
			<span>Item 1</span>
			<span>Item 2</span>
			<span>Item 3</span>
		</Flex>
	),
	trigger: <div>Trigger</div>,
	openDefault: true,
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
	children: (
		<Flex direction="column" gap="16" width="100px" align="center">
			<span>Item 1</span>
			<span>Item 2</span>
			<span>Item 3</span>
		</Flex>
	),
	trigger: <div>Trigger</div>,
	direction: 'bottom_left',
	openDefault: true,
};

export const BottomCenter = Template.bind({});
BottomCenter.args = {
	children: (
		<Flex direction="column" gap="16" width="100px" align="center">
			<span>Item 1</span>
			<span>Item 2</span>
			<span>Item 3</span>
		</Flex>
	),
	trigger: <div>Trigger</div>,
	direction: 'bottom_center',
	openDefault: true,
};

export const TopRight = Template.bind({});
TopRight.args = {
	children: (
		<Flex direction="column" gap="16" width="100px" align="center">
			<span>Item 1</span>
			<span>Item 2</span>
			<span>Item 3</span>
		</Flex>
	),
	trigger: <div>Trigger</div>,
	direction: 'top_right',
	openDefault: true,
};

export const TopLeft = Template.bind({});
TopLeft.args = {
	children: (
		<Flex direction="column" gap="16" width="100px" align="center">
			<span>Item 1</span>
			<span>Item 2</span>
			<span>Item 3</span>
		</Flex>
	),
	trigger: <div>Trigger</div>,
	direction: 'top_left',
	openDefault: true,
};

export const TopCenter = Template.bind({});
TopCenter.args = {
	children: (
		<Flex direction="column" gap="16" width="100px" align="center">
			<span>Item 1</span>
			<span>Item 2</span>
			<span>Item 3</span>
		</Flex>
	),
	trigger: <div>Trigger</div>,
	direction: 'top_center',
	openDefault: true,
};
