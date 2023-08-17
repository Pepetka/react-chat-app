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
import * as yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { Avatar } from '@/shared/ui/Avatar';
import { fileListToPaths } from '@/shared/helpers/fileListToPaths/fileListToPaths';
import { TextArea } from '@/shared/ui/TextArea';
import { getProfilePagePath } from '@/shared/const/router';
import { Spinner } from '@/shared/ui/Spinner';
import { getUserAuthData } from '@/entities/User';
import {
	useEditProfileMutation,
	useFetchProfileDataQuery,
} from '../../api/editProfileApi';

export type Inputs = {
	firstname: string;
	lastname: string;
	email: string;
	status: string | undefined;
	age: number;
	avatar: any;
};

const StyledFileInput = styled.input`
	display: none;
`;

export const EditProfileForm = memo(() => {
	const { t } = useTranslation('editProfile');
	const authData = useSelector(getUserAuthData);
	const {
		data: profileData,
		isFetching: profileLoading,
		error: profileError,
	} = useFetchProfileDataQuery(
		{ profileId: authData?.id ?? '' },
		{ refetchOnMountOrArgChange: true },
	);
	const [image, setImage] = useState<string>(profileData?.avatar ?? '');
	const [onEditProfile, { error: editError, isLoading, isSuccess }] =
		useEditProfileMutation();
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const navigate = useNavigate();

	const schema = yup
		.object({
			firstname: yup.string().required(`${t('Firstname')} ${t('is required')}`),
			lastname: yup.string().required(`${t('Lastname')} ${t('is required')}`),
			email: yup
				.string()
				.email(t('Incorrect email'))
				.required(`${t('Email')} ${t('is required')}`),
			status: yup.string(),
			age: yup
				.number()
				.positive(t('Incorrect age'))
				.integer()
				.min(14, t('Age must be over 14'))
				.required(`${t('Age')} ${t('is required')}`),
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
				name: 'firstname',
				type: 'text',
				label: t('Enter firstname'),
			},
			{
				name: 'lastname',
				type: 'text',
				label: t('Enter lastname'),
			},
			{
				name: 'email',
				type: 'text',
				label: t('Enter email'),
			},
			{
				name: 'age',
				type: 'number',
				label: t('Enter age'),
			},
			{
				name: 'status',
				type: 'text',
				label: t('Enter status'),
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
			firstname: profileData?.firstname ?? '',
			lastname: profileData?.lastname ?? '',
			email: profileData?.email ?? '',
			status: profileData?.status ?? '',
			age: profileData?.age ?? 14,
			avatar: undefined,
		},
		resolver: yupResolver(schema),
	});
	const onEdit: SubmitHandler<Inputs> = useCallback(
		(data) => {
			onEditProfile(data);
		},
		[onEditProfile],
	);

	const onInputImage = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const images = fileListToPaths(event.target.files);
			setImage(images[0] ?? profileData?.avatar);
		},
		[profileData?.avatar],
	);

	const onEditAvatar = useCallback(() => {
		fileInputRef.current?.click();
	}, []);

	const onReset = useCallback(() => {
		reset();
		setImage(profileData?.avatar ?? '');
	}, [profileData?.avatar, reset]);

	useEffect(() => {
		if (isSuccess) navigate(getProfilePagePath(profileData?.id ?? ''));
	}, [profileData?.id, isSuccess, navigate]);

	useEffect(() => {
		if (profileData) {
			reset({
				firstname: profileData?.firstname,
				lastname: profileData?.lastname,
				email: profileData?.email,
				status: profileData.status,
				age: profileData.age,
				avatar: undefined,
			});
			setImage(profileData?.avatar ?? '');
		}
	}, [profileData, reset]);

	if (profileLoading) {
		return (
			<Card
				data-testid="EditProfileForm.loading"
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

	if (profileError) {
		return (
			<Card
				data-testid="EditProfileForm.error"
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
				data-testid="EditProfileForm.form"
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
						render={({ field }) => {
							if (name === 'status') {
								return (
									<TextArea
										data-testid={`EditProfileForm.input.${name}`}
										theme="invert"
										label={label}
										width="100%"
										error={!!formErrors[name]}
										autoFocus={!index}
										rows={3}
										{...field}
									/>
								);
							}

							return (
								<Input
									data-testid={`EditProfileForm.input.${name}`}
									theme="invert"
									label={label}
									width="100%"
									type={type}
									error={!!formErrors[name]}
									autoFocus={!index}
									{...field}
								/>
							);
						}}
					/>
				))}
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
				<Flex justify="space-between" wrap="wrap" gap="8">
					<Button
						theme="primary"
						invert
						width="160px"
						height="50px"
						onClick={onReset}
						type="reset"
					>
						<Text textAlign="center" text={t('Reset profile')} />
					</Button>
					<Button
						theme="primary"
						invert
						width="160px"
						height="50px"
						type="submit"
					>
						<Text
							textAlign="center"
							text={isLoading ? t('Loading') : t('Edit profile')}
						/>
					</Button>
				</Flex>
				{editError && (
					<Text
						data-testid={'EditProfileForm.error.server'}
						text={
							(editError as { data: { message?: string } }).data?.message ??
							t('Something went wrong')
						}
						textAlign="center"
						theme="error"
					/>
				)}
				{Object.entries(formErrors).map(([name, { message }]) => (
					<Text
						data-testid={`EditProfileForm.error.${name}`}
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
