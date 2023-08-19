import { Meta, StoryFn } from '@storybook/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { RouterDecorator } from '@/shared/config/storybook/decorators';
import { GroupDataForm } from './GroupDataForm';

export default {
	title: 'entities/Group/GroupDataForm',
	component: GroupDataForm,
	decorators: [RouterDecorator()],
} as Meta<typeof GroupDataForm>;

const Template: StoryFn<typeof GroupDataForm> = (args) => (
	<GroupDataForm {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};

export const WithReset = Template.bind({});
WithReset.args = {
	withReset: true,
};

export const LoadingData = Template.bind({});
LoadingData.args = {
	groupLoading: true,
};

export const LoadingSending = Template.bind({});
LoadingSending.args = {
	isLoading: true,
};

export const Error = Template.bind({});
Error.args = {
	groupError: true,
};

export const ErrorSending = Template.bind({});
ErrorSending.args = {
	sendError: { data: { message: 'Some send error' } } as FetchBaseQueryError,
};
