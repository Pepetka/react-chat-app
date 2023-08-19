import React, {
	ChangeEvent,
	InputHTMLAttributes,
	memo,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import styled from 'styled-components';
import { fileListToPaths } from '@/shared/helpers/fileListToPaths/fileListToPaths';
import { getGroupPagePath } from '@/shared/const/router';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Avatar } from '@/shared/ui/Avatar';
import { TextArea } from '@/shared/ui/TextArea';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { Group } from '@/entities/Group';
import { Spinner } from '@/shared/ui/Spinner';
import { GroupDataFormInputs } from '../../model/types/groupSchema';

interface IGroupDataFormProps {
	onSendGroupData: (data: GroupDataFormInputs) => void;
	groupData?: Group;
	sendError?: FetchBaseQueryError | SerializedError;
	isLoading: boolean;
	isSuccess: boolean;
	groupLoading?: boolean;
	groupError?: boolean;
	withReset?: boolean;
	'data-testid'?: string;
}

export type Inputs = GroupDataFormInputs;

const StyledFileInput = styled.input`
	display: none;
`;

export const GroupDataForm = memo((props: IGroupDataFormProps) => {
	const {
		sendError,
		groupData,
		isLoading,
		isSuccess,
		onSendGroupData,
		groupError = false,
		groupLoading = false,
		withReset = false,
		'data-testid': dataTestId,
	} = props;
	const { t } = useTranslation('groupData');
	const [image, setImage] = useState<string>(groupData?.avatar ?? '');
	const [tags, setTags] = useState<Array<string>>(groupData?.tags ?? []);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const navigate = useNavigate();

	const schema = yup
		.object({
			name: yup.string().required(`${t('Name')} ${t('is required')}`),
			tags: yup.string(),
			description: yup.string(),
			avatar: yup.mixed(),
		})
		.required();

	const inputsArray: Array<{
		type: InputHTMLAttributes<HTMLInputElement>['type'];
		name: keyof Inputs;
		label: string;
	}> = useMemo(
		() => [
			{
				name: 'name',
				type: 'text',
				label: t('Enter name'),
			},
			{
				name: 'description',
				type: 'text',
				label: t('Enter description'),
			},
			{
				name: 'tags',
				type: 'text',
				label: t('Enter tags'),
			},
		],
		[t],
	);

	const {
		reset,
		control,
		handleSubmit,
		formState: { errors: formErrors },
	} = useForm<Inputs>({
		defaultValues: {
			name: groupData?.name ?? '',
			tags:
				groupData?.tags ?? ''
					? `#${groupData?.tags.map((tag) => tag.trim()).join('#')}`
					: '',
			description: groupData?.description ?? '',
			avatar: undefined,
		},
		resolver: yupResolver(schema),
	});
	const onEdit: SubmitHandler<Inputs> = useCallback(
		(data) => {
			onSendGroupData(data);
		},
		[onSendGroupData],
	);

	const onInputImage = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const images = fileListToPaths(event.target.files);
		setImage(images[0] ?? groupData?.avatar);
	}, []);

	const onInputTags = useCallback((value: string) => {
		const tags = value.split('#').map((tag) => tag.trim());
		tags.splice(0, 1);
		setTags(tags.filter((tag) => !!tag).map((tag) => `#${tag}`));
	}, []);

	const onEditAvatar = useCallback(() => {
		fileInputRef.current?.click();
	}, []);

	const onReset = useCallback(() => {
		reset();
		setImage(groupData?.avatar ?? '');
		setTags(groupData?.tags ?? []);
	}, [groupData?.avatar, groupData?.tags, reset]);

	useEffect(() => {
		if (isSuccess) navigate(getGroupPagePath(groupData?.id ?? ''));
	}, [groupData, isSuccess, navigate]);

	useEffect(() => {
		if (groupData) {
			reset({
				name: groupData?.name,
				tags: `#${groupData?.tags.map((tag) => tag.trim()).join('#')}`,
				description: groupData?.description,
				avatar: undefined,
			});
			setImage(groupData?.avatar ?? '');
			setTags(groupData?.tags ?? []);
		}
	}, [groupData, reset]);

	if (groupLoading) {
		return (
			<Card
				data-testid={`${dataTestId}.loading`}
				borderRadius={false}
				width="100%"
				height="100vh"
			>
				<Flex justify="center" align="center" width="100%" height="100%">
					<Spinner theme="invert" />
				</Flex>
			</Card>
		);
	}

	if (groupError) {
		return (
			<Card
				data-testid={`${dataTestId}.error`}
				borderRadius={false}
				width="100%"
				height="100vh"
			>
				<Flex justify="center" align="center" width="100%" height="100%">
					<Text
						theme="error"
						title={t('Something went wrong')}
						TitleTag="p"
						titleAlign="center"
					/>
				</Flex>
			</Card>
		);
	}

	return (
		<Card borderRadius={false} width="100%">
			<Flex
				data-testid={`${dataTestId}.form`}
				direction="column"
				align="center"
				gap="16"
				FlexTag="form"
				onSubmit={handleSubmit(onEdit)}
			>
				<Flex width="auto">
					<Avatar src={image} size="xl" onClick={onEditAvatar} />
				</Flex>
				{inputsArray.map(({ name, type, label }, index) => (
					<Controller
						key={name}
						name={name}
						control={control}
						render={({ field: { onChange, ...field } }) => {
							if (name === 'description') {
								return (
									<TextArea
										data-testid={`${dataTestId}.input.${name}`}
										theme="invert"
										label={label}
										width="100%"
										error={!!formErrors[name]}
										autoFocus={!index}
										rows={3}
										onChange={onChange}
										{...field}
									/>
								);
							}

							return (
								<Input
									data-testid={`${dataTestId}.input.${name}`}
									theme="invert"
									label={label}
									width="100%"
									type={type}
									error={!!formErrors[name]}
									autoFocus={!index}
									onChange={(value) => {
										if (name === 'tags') onInputTags(value);
										onChange(value);
									}}
									{...field}
								/>
							);
						}}
					/>
				))}
				<Flex gap="4" minHeight="44px" wrap="wrap">
					{tags.map((tag, index) => (
						<Card key={index} invert width="auto" height="auto" padding="10px">
							<Text text={tag} width="auto" />
						</Card>
					))}
				</Flex>
				<Controller
					name="avatar"
					control={control}
					render={({ field: { ref, value, onChange, ...field } }) => (
						<StyledFileInput
							ref={(instance) => {
								ref(instance);
								fileInputRef.current = instance;
							}}
							value={value?.fileName}
							onChange={(event) => {
								onInputImage(event);
								onChange(event.target.files);
							}}
							type="file"
							accept="image/*"
							{...field}
						/>
					)}
				/>
				<Flex justify={withReset ? 'space-between' : 'end'} wrap="wrap" gap="8">
					{withReset && (
						<Button
							theme="primary"
							invert
							width="160px"
							height="50px"
							onClick={onReset}
							type="reset"
						>
							<Text textAlign="center" text={t('Reset group')} />
						</Button>
					)}
					<Button
						theme="primary"
						invert
						width="160px"
						height="50px"
						type="submit"
					>
						<Text
							textAlign="center"
							text={isLoading ? t('Loading') : t('Send')}
						/>
					</Button>
				</Flex>
				{sendError && (
					<Text
						data-testid={`${dataTestId}.error.server`}
						text={
							(sendError as { data: { message?: string } }).data?.message ??
							t('Something went wrong')
						}
						textAlign="center"
						theme="error"
					/>
				)}
				{Object.entries(formErrors).map(([name, { message }]) => (
					<Text
						data-testid={`${dataTestId}.error.${name}`}
						key={name}
						text={message as string}
						textAlign="center"
						theme="error"
					/>
				))}
			</Flex>
		</Card>
	);
});
