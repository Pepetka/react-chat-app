import {
	InputHTMLAttributes,
	memo,
	useCallback,
	useEffect,
	useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';
import { Flex } from '@/shared/ui/Flex';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { userActions } from '@/entities/User';
import { useRegisterUserMutation } from '../../api/registerByUsernameApi';

type RegisterErrorType = { data: { message: string } };
type Inputs = {
	username: string;
	password: string;
	age: number;
	email: string;
	firstname: string;
	lastname: string;
	agree: boolean;
};

export const RegisterForm = memo(() => {
	const { t } = useTranslation('auth');
	const isSmallestScreen = useMediaQuery({ maxWidth: 540 });
	const isMediumScreen = useMediaQuery({ minWidth: 768 });
	const [
		onSendLoginData,
		{ data: userData, isLoading, error: registerError, isError },
	] = useRegisterUserMutation();
	const dispatch = useAppDispatch();

	const schema = yup
		.object({
			username: yup.string().required(`${t('Username')} ${t('is required')}`),
			password: yup.string().required(`${t('Password')} ${t('is required')}`),
			age: yup
				.number()
				.positive(t('Incorrect age'))
				.integer()
				.min(14, t('Age must be over 10'))
				.required(`${t('Age')} ${t('is required')}`),
			email: yup
				.string()
				.email(t('Incorrect email'))
				.required(`${t('Email')} ${t('is required')}`),
			firstname: yup.string().required(`${t('Firstname')} ${t('is required')}`),
			lastname: yup.string().required(`${t('Lastname')} ${t('is required')}`),
			agree: yup.boolean().oneOf([true], t('Agree is required')).required(),
		})
		.required();

	const inputsArray: Array<{
		type: InputHTMLAttributes<HTMLInputElement>['type'];
		name: Exclude<keyof Inputs, 'agree'>;
		label: string;
	}> = useMemo(
		() => [
			{
				name: 'username',
				type: 'text',
				label: t('Enter username'),
			},
			{
				name: 'password',
				type: 'password',
				label: t('Enter password'),
			},
			{
				name: 'age',
				type: 'number',
				label: t('Enter your age'),
			},
			{
				name: 'email',
				type: 'text',
				label: t('Enter email'),
			},
			{
				name: 'firstname',
				type: 'text',
				label: t('Enter your name'),
			},
			{
				name: 'lastname',
				type: 'text',
				label: t('Enter surname'),
			},
		],
		[t],
	);

	const {
		register,
		control,
		handleSubmit,
		formState: { errors: formErrors },
	} = useForm<Inputs>({
		defaultValues: {
			username: '',
			password: '',
			age: 0,
			email: '',
			firstname: '',
			lastname: '',
			agree: false,
		},
		resolver: yupResolver(schema),
	});
	const onRegister: SubmitHandler<Inputs> = useCallback(
		(data) => {
			onSendLoginData(data);
		},
		[onSendLoginData],
	);

	useEffect(() => {
		if (userData) {
			dispatch(userActions.setUser(userData));
		}
	}, [dispatch, userData]);

	return (
		<Flex justify="center">
			<Card
				padding="16px"
				border
				width={!isSmallestScreen ? '570px' : '90%'}
				minHeight={!isSmallestScreen ? '1000px' : '832px'}
			>
				<Flex width="100%" height="100%" justify="center" align="center">
					<Flex minHeight="800px" direction="column" align="center" gap="24">
						<Text
							title={t('Sign Up')}
							titleAlign="center"
							theme="primary-invert"
							size={isMediumScreen ? 'xl' : 'l'}
						/>
						<Flex
							FlexTag="form"
							onSubmit={handleSubmit(onRegister)}
							direction="column"
							align="center"
							gap="40"
						>
							{inputsArray.map(({ name, type, label }) => (
								<Controller
									key={name}
									name={name}
									control={control}
									render={({ field }) => (
										<Input
											theme="invert"
											label={label}
											width={isMediumScreen ? '500px' : '100%'}
											type={type}
											error={!!formErrors[name]}
											{...field}
										/>
									)}
								/>
							))}
							<Flex
								justify="space-between"
								align="center"
								width={isMediumScreen ? '500px' : '100%'}
							>
								<Flex FlexTag="label" align="center" gap="8">
									<input type="checkbox" {...register('agree')} />
									<Text
										text={t('I agree with terms')}
										theme={formErrors.agree ? 'error' : 'primary-invert'}
									/>
								</Flex>
								<Button
									width={isMediumScreen ? '180px' : '120px'}
									height="50px"
									disabled={isLoading}
									theme="primary"
									type="submit"
									invert
								>
									<Text
										text={isLoading ? t('Loading') : t('Sign up')}
										textAlign="center"
										size={isMediumScreen ? 'l' : 'm'}
									/>
								</Button>
							</Flex>
						</Flex>
						{isError && (
							<Text
								text={
									(registerError as RegisterErrorType)?.data
										? (registerError as RegisterErrorType).data.message
										: t('Something went wrong')
								}
								textAlign="center"
								theme="error"
							/>
						)}
						{Object.entries(formErrors).map(([name, { message }]) => (
							<Text
								key={name}
								text={message}
								textAlign="center"
								theme="error"
							/>
						))}
					</Flex>
				</Flex>
			</Card>
		</Flex>
	);
});
