import {
	ChangeEvent,
	FormEvent,
	memo,
	useCallback,
	useEffect,
	useMemo,
} from 'react';
import { useSelector } from 'react-redux';
import { authByUsernameState } from '@/features/AuthByUsername/model/selectors/authByUsernameSelectors';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { authByUsernameActions } from '@/features/AuthByUsername/model/slice/authByUserNameSlice';
import { useAuthUserMutation } from '@/features/AuthByUsername/api/authByUsernameApi';
import { userActions } from '@/entities/User';

export const LoginForm = memo(() => {
	const { username, password } = useSelector(authByUsernameState);
	const [onSendLoginData, { data: userData, isLoading, error }] =
		useAuthUserMutation();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (userData) dispatch(userActions.setUser(userData));
	}, [dispatch, userData]);

	const { onChangeUsername, onChangePassword } = useMemo(
		() => ({
			onChangeUsername: (event: ChangeEvent<HTMLInputElement>) => {
				dispatch(authByUsernameActions.setUsername(event.target.value));
			},
			onChangePassword: (event: ChangeEvent<HTMLInputElement>) => {
				dispatch(authByUsernameActions.setPassword(event.target.value));
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
		<form onSubmit={onLogin}>
			<label htmlFor="username">Username</label>
			<input
				value={username}
				onChange={onChangeUsername}
				name="username"
				type="text"
				required
			/>
			<hr />
			<label htmlFor="password">Password</label>
			<input
				value={password}
				onChange={onChangePassword}
				name="password"
				type="password"
				required
			/>
			<button type="submit">Login</button>
		</form>
	);
});
