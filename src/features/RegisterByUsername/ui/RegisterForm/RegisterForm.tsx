import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';
import { Flex } from '@/shared/ui/Flex';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { DynamicModuleLoader } from '@/shared/components';
import { userActions } from '@/entities/User';
import {
	registerByUsernameActions,
	registerByUsernameReducer,
} from '../../model/slice/registerByUserNameSlice';
import { useRegisterUserMutation } from '../../api/registerByUsernameApi';
import { registerByUsernameState } from '../../model/selectors/registerByUsernameSelectors';

type RegisterErrorType = { data: { message: string } };

export const RegisterForm = memo(() => {
	const { t } = useTranslation('auth');
	const [hasError, setHasError] = useState(false);
	const [agree, setAgree] = useState(false);
	const { username, password, age, email, firstname, lastname } = useSelector(
		registerByUsernameState,
	);
	const [
		onSendLoginData,
		{ data: userData, isLoading, error: registerError, isError },
	] = useRegisterUserMutation();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (userData) {
			dispatch(userActions.setUser(userData));
			dispatch(registerByUsernameActions.clear());
		}
	}, [dispatch, userData]);

	useEffect(() => {
		if (isError) {
			setHasError(true);
		}
	}, [isError]);

	const {
		onChangeUsername,
		onChangePassword,
		onChangeAge,
		onChangeEmail,
		onChangeFirstname,
		onChangeLastname,
	} = useMemo(
		() => ({
			onChangeUsername: (value: string) => {
				dispatch(registerByUsernameActions.setUsername(value));
				setHasError(false);
			},
			onChangePassword: (value: string) => {
				dispatch(registerByUsernameActions.setPassword(value));
				setHasError(false);
			},
			onChangeAge: (value: string) => {
				const numString = value.match(/\d+/g)?.join('')
					? value.match(/\d+/g)?.join('')
					: '0';

				dispatch(registerByUsernameActions.setAge(Number(numString)));
				setHasError(false);
			},
			onChangeEmail: (value: string) => {
				dispatch(registerByUsernameActions.setEmail(value));
				setHasError(false);
			},
			onChangeFirstname: (value: string) => {
				dispatch(registerByUsernameActions.setFirstname(value));
				setHasError(false);
			},
			onChangeLastname: (value: string) => {
				dispatch(registerByUsernameActions.setLastname(value));
				setHasError(false);
			},
		}),
		[dispatch],
	);

	const onAgree = () => {
		setAgree((prev) => !prev);
	};

	const onRegister = useCallback(() => {
		onSendLoginData({
			username,
			password,
			email,
			firstname,
			lastname,
			age,
		});
	}, [age, email, firstname, lastname, onSendLoginData, password, username]);

	return (
		<DynamicModuleLoader
			reducerKey="registerByUsername"
			reducer={registerByUsernameReducer}
		>
			<Card border width="570px" height="1000px">
				<Flex width="100%" height="100%" justify="center" align="center">
					<Flex height="800px" direction="column" align="center" gap="24">
						<Text
							title={t('Sign Up')}
							titleAlign="center"
							theme="primary-invert"
							size="xl"
						/>
						<Flex
							FlexTag="form"
							onSubmit={onRegister}
							direction="column"
							align="center"
							gap="40"
						>
							<Input
								theme="invert"
								label={t('Enter username')}
								value={username}
								onChange={onChangeUsername}
								width="500px"
								name="username"
								type="text"
								required
							/>
							<Input
								theme="invert"
								label={t('Enter password')}
								width="500px"
								value={password}
								onChange={onChangePassword}
								name="password"
								type="password"
								required
							/>
							<Input
								theme="invert"
								label={t('Enter your age')}
								width="500px"
								value={String(age)}
								onChange={onChangeAge}
								name="age"
								type="text"
								required
							/>
							<Input
								theme="invert"
								label={t('Enter email')}
								width="500px"
								value={email}
								onChange={onChangeEmail}
								name="email"
								type="email"
								required
							/>
							<Input
								theme="invert"
								label={t('Enter your name')}
								width="500px"
								value={firstname}
								onChange={onChangeFirstname}
								name="firstname"
								type="firstname"
								required
							/>
							<Input
								theme="invert"
								label={t('Enter surname')}
								width="500px"
								value={lastname}
								onChange={onChangeLastname}
								name="lastname"
								type="lastname"
								required
							/>
							<Flex justify="space-between" align="center" width="500px">
								<Flex FlexTag="label" align="center" gap="8">
									<input
										type="checkbox"
										checked={agree}
										onChange={onAgree}
										required
									/>
									<Text text={t('I agree with terms')} theme="primary-invert" />
								</Flex>
								<Button
									width="180px"
									height="50px"
									disabled={isLoading}
									theme="primary"
									type="submit"
									invert
								>
									<Text
										text={isLoading ? t('Loading') : t('Sign up')}
										textAlign="center"
										size="l"
									/>
								</Button>
							</Flex>
						</Flex>
						{hasError && (
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
					</Flex>
				</Flex>
			</Card>
		</DynamicModuleLoader>
	);
});
