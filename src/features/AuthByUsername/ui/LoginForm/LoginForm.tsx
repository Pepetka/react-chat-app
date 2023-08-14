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
import { useAuthUserMutation } from '../../api/authByUsernameApi';

type LoginErrorType = { data: { message: string } };
export type Inputs = {
	username: string;
	password: string;
};

export const LoginForm = memo(() => {
	const { t } = useTranslation('auth');
	const isSmallestScreen = useMediaQuery({ maxWidth: 540 });
	const isMediumScreen = useMediaQuery({ minWidth: 768 });
	const [
		onSendLoginData,
		{ data: userData, isLoading, error: loginError, isError },
	] = useAuthUserMutation();
	const dispatch = useAppDispatch();

	const schema = yup
		.object({
			username: yup.string().required(`${t('Username')} ${t('is required')}`),
			password: yup.string().required(`${t('Password')} ${t('is required')}`),
		})
		.required();

	const inputsArray: Array<{
		type: InputHTMLAttributes<HTMLInputElement>['type'];
		name: keyof Inputs;
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
		],
		[t],
	);

	const {
		control,
		handleSubmit,
		formState: { errors: formErrors },
	} = useForm<Inputs>({
		defaultValues: {
			username: '',
			password: '',
		},
		resolver: yupResolver(schema),
	});
	const onLogin: SubmitHandler<Inputs> = useCallback(
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
				width={!isSmallestScreen ? '570px' : '100%'}
				minHeight={!isSmallestScreen ? '600px' : '412px'}
			>
				<Flex height="100%" justify="center" align="center">
					<Flex minHeight="380px" direction="column" align="center" gap="24">
						<Text
							title={t('Log In')}
							titleAlign="center"
							theme="primary-invert"
							size={isMediumScreen ? 'xl' : 'l'}
						/>
						<Flex
							FlexTag="form"
							onSubmit={handleSubmit(onLogin)}
							direction="column"
							align="center"
							gap="40"
							data-testid="LoginForm.form"
						>
							{inputsArray.map(({ name, type, label }) => (
								<Controller
									key={name}
									name={name}
									control={control}
									render={({ field }) => (
										<Input
											data-testid={`LoginForm.input.${name}`}
											theme="invert"
											label={label}
											width={isMediumScreen ? '500px' : '100%'}
											type={type}
											error={!!formErrors[name]}
											autoFocus={name === 'username'}
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
								<Flex width="40%" align="center">
									<a href="#">
										<Text
											text={t('Forgot your password?')}
											theme="primary-invert"
										/>
									</a>
								</Flex>
								<Button
									width={isMediumScreen ? '180px' : '140px'}
									height="50px"
									disabled={isLoading}
									theme="primary"
									type="submit"
									invert
								>
									<Text
										text={isLoading ? t('Loading') : t('Log in')}
										textAlign="center"
										size={isMediumScreen ? 'l' : 'm'}
									/>
								</Button>
							</Flex>
						</Flex>
						{isError && (
							<Text
								data-testid={'LoginForm.error.server'}
								text={
									(loginError as LoginErrorType)?.data
										? (loginError as LoginErrorType).data.message
										: t('Something went wrong')
								}
								textAlign="center"
								theme="error"
							/>
						)}
						{Object.entries(formErrors).map(([name, { message }]) => (
							<Text
								data-testid={`LoginForm.error.${name}`}
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
