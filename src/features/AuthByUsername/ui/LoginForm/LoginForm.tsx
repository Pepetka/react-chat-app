import {
	ChangeEvent,
	FormEvent,
	memo,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useSelector } from 'react-redux';
import { authByUsernameState } from '@/features/AuthByUsername/model/selectors/authByUsernameSelectors';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { authByUsernameActions } from '@/features/AuthByUsername/model/slice/authByUserNameSlice';
import { useAuthUserMutation } from '@/features/AuthByUsername/api/authByUsernameApi';
import { userActions } from '@/entities/User';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';
import { Flex } from '@/shared/ui/Flex';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';

type LoginErrorType = { data: { message: string } };

export const LoginForm = memo(() => {
	const [hasError, setHasError] = useState(false);
	const { username, password } = useSelector(authByUsernameState);
	const [
		onSendLoginData,
		{ data: userData, isLoading, error: loginError, isError },
	] = useAuthUserMutation();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (userData) {
			dispatch(userActions.setUser(userData));
			dispatch(authByUsernameActions.clear());
		}
	}, [dispatch, userData]);

	useEffect(() => {
		if (isError) {
			setHasError(true);
		}
	}, [isError]);

	const { onChangeUsername, onChangePassword } = useMemo(
		() => ({
			onChangeUsername: (value: string) => {
				dispatch(authByUsernameActions.setUsername(value));
				setHasError(false);
			},
			onChangePassword: (value: string) => {
				dispatch(authByUsernameActions.setPassword(value));
				setHasError(false);
			},
		}),
		[dispatch],
	);

	const onHandleClick = useCallback(() => {
		onSendLoginData({
			password,
			username,
		});
	}, [onSendLoginData, password, username]);

	const onLogin = useCallback(
		(event: FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			onHandleClick();
		},
		[onHandleClick],
	);

	return (
		<Card width="570px" height="600px">
			<Flex direction="column" align="center" gap="24">
				<Text title="Login" titleAlign="center" />
				<form onSubmit={onLogin}>
					<Flex direction="column" align="center" gap="40">
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
					</Flex>
				</form>
				<Flex justify="space-between" align="center" width="500px">
					<a href="hjh">Forgot your password?</a>
					<Button
						width="180px"
						height="50px"
						disabled={isLoading}
						theme="primary"
						onClick={onHandleClick}
						invert
					>
						{isLoading ? 'Loading...' : 'Login'}
					</Button>
				</Flex>
				{hasError && <div>{(loginError as LoginErrorType).data.message}</div>}
			</Flex>
		</Card>
	);
});
