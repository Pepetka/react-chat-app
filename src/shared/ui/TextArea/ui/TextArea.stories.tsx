import { Meta, StoryFn } from '@storybook/react';
import { Card } from '@/shared/ui/Card';
import { TextArea } from './TextArea';

export default {
	title: 'shared/TextArea',
	component: TextArea,
} as Meta<typeof TextArea>;

const Template: StoryFn<typeof TextArea> = (args) => <TextArea {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	width: '300px',
	label: 'Some label',
	onChange: () => {},
};

export const PrimaryWithValue = Template.bind({});
PrimaryWithValue.args = {
	value: 'Some value',
	width: '300px',
	label: 'Some label',
	onChange: () => {},
};
PrimaryWithValue.decorators = [
	(StoryComponent) => (
		<Card invert>
			<StoryComponent />
		</Card>
	),
];

export const Inverted = Template.bind({});
Inverted.args = {
	width: '300px',
	label: 'Some label',
	theme: 'invert',
	onChange: () => {},
};

export const InvertedWithValue = Template.bind({});
InvertedWithValue.args = {
	value: 'Some value',
	width: '300px',
	label: 'Some label',
	theme: 'invert',
	onChange: () => {},
};
InvertedWithValue.decorators = [
	(StoryComponent) => (
		<Card>
			<StoryComponent />
		</Card>
	),
];
