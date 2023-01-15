import {
	FormEvent,
	memo,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useSelector } from 'react-redux';
import { registerByUsernameState } from '../../model/selectors/registerByUsernameSelectors';
import { useRegisterUserMutation } from '../../api/registerByUsernameApi';
import { registerByUsernameActions } from '../../model/slice/registerByUserNameSlice';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { userActions } from '@/entities/User';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';
import { Flex } from '@/shared/ui/Flex';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';

type RegisterErrorType = { data: { message: string } };

export const RegisterForm = memo(() => {
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

	const onHandleClick = useCallback(() => {
		onSendLoginData({
			username,
			password,
			email,
			firstname,
			lastname,
			age,
		});
	}, [age, email, firstname, lastname, onSendLoginData, password, username]);

	const onLogin = useCallback(
		(event: FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			onHandleClick();
		},
		[onHandleClick],
	);

	return (
		<Card border width="570px" height="1000px">
			<Flex height="800px" direction="column" align="center" gap="24">
				<Text title="Sign Up" titleAlign="center" theme="invert" size="xl" />
				<Flex
					FlexTag="form"
					onSubmit={onLogin}
					direction="column"
					align="center"
					gap="40"
				>
					<Input
						theme="invert"
						label="Enter username..."
						value={username}
						onChange={onChangeUsername}
						width="500px"
						name="username"
						type="text"
						required
					/>
					<Input
						theme="invert"
						label="Enter password..."
						width="500px"
						value={password}
						onChange={onChangePassword}
						name="password"
						type="password"
						required
					/>
					<Input
						theme="invert"
						label="Enter your age..."
						width="500px"
						value={String(age)}
						onChange={onChangeAge}
						name="age"
						type="text"
						required
					/>
					<Input
						theme="invert"
						label="Enter email..."
						width="500px"
						value={email}
						onChange={onChangeEmail}
						name="email"
						type="email"
						required
					/>
					<Input
						theme="invert"
						label="Enter your name..."
						width="500px"
						value={firstname}
						onChange={onChangeFirstname}
						name="firstname"
						type="firstname"
						required
					/>
					<Input
						theme="invert"
						label="Enter surname..."
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
							<Text text="I agree with terms" theme="invert" />
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
								text={isLoading ? 'Loading...' : 'Sign up'}
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
								: 'Something went wrong'
						}
						textAlign="center"
						theme="error"
					/>
				)}
			</Flex>
		</Card>
	);
});
