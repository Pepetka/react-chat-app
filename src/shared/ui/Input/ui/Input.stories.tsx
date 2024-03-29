import { Meta, StoryFn } from '@storybook/react';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import { Card } from '@/shared/ui/Card';
import { Input } from './Input';

export default {
	title: 'shared/Input',
	component: Input,
	decorators: [RouterDecorator()],
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = (args) => <Input {...args} />;

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
