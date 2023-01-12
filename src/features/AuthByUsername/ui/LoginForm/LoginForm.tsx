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
			onChangeUsername: (event: ChangeEvent<HTMLInputElement>) => {
				dispatch(authByUsernameActions.setUsername(event.target.value));
				setHasError(false);
			},
			onChangePassword: (event: ChangeEvent<HTMLInputElement>) => {
				dispatch(authByUsernameActions.setPassword(event.target.value));
				setHasError(false);
			},
		}),
		[dispatch],
	);

	const onLogin = useCallback(
		(event: FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			onSendLoginData({
				password,
				username,
			});
		},
		[onSendLoginData, password, username],
	);

	return (
		<>
			<form onSubmit={onLogin}>
				<label htmlFor="username">Username</label>
				<input
					value={username}
					onChange={onChangeUsername}
					name="username"
					type="text"
					required
				/>
				<label htmlFor="password">Password</label>
				<input
					value={password}
					onChange={onChangePassword}
					name="password"
					type="password"
					required
				/>
				<button type="submit" disabled={isLoading}>
					{isLoading ? 'Loading...' : 'Login'}
				</button>
			</form>
			{hasError && <div>{(loginError as LoginErrorType).data.message}</div>}
		</>
	);
});
