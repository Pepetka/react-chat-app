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
import { useAuthUserMutation } from '../../api/authByUsernameApi';
import {
	authByUsernameActions,
	authByUsernameReducer,
} from '../../model/slice/authByUserNameSlice';
import { authByUsernameState } from '../../model/selectors/authByUsernameSelectors';

type LoginErrorType = { data: { message: string } };

export const LoginForm = memo(() => {
	const { t } = useTranslation('auth');
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

	const onLogin = useCallback(() => {
		onSendLoginData({
			password,
			username,
		});
	}, [onSendLoginData, password, username]);

	return (
		<DynamicModuleLoader
			reducerKey="authByUsername"
			reducer={authByUsernameReducer}
		>
			<Flex justify="center">
				<Card
					padding="16px"
					border
					width={window.innerWidth > 570 ? '570px' : '90%'}
					height={window.innerWidth > 570 ? '600px' : '412px'}
				>
					<Flex height="100%" justify="center" align="center">
						<Flex height="380px" direction="column" align="center" gap="24">
							<Text
								title={t('Log In')}
								titleAlign="center"
								theme="primary-invert"
								size={window.innerWidth > 768 ? 'xl' : 'l'}
							/>
							<Flex
								FlexTag="form"
								onSubmit={onLogin}
								direction="column"
								align="center"
								gap="40"
							>
								<Input
									theme="invert"
									label={t('Enter username')}
									value={username}
									onChange={onChangeUsername}
									width={window.innerWidth > 768 ? '500px' : '100%'}
									name="username"
									type="text"
									required
								/>
								<Input
									theme="invert"
									label={t('Enter password')}
									width={window.innerWidth > 768 ? '500px' : '100%'}
									value={password}
									onChange={onChangePassword}
									name="password"
									type="password"
									required
								/>
								<Flex
									justify="space-between"
									align="center"
									width={window.innerWidth > 768 ? '500px' : '100%'}
								>
									<a href="#">
										<Text
											text={t('Forgot your password?')}
											theme="primary-invert"
										/>
									</a>
									<Button
										width={window.innerWidth > 768 ? '180px' : '120px'}
										height="50px"
										disabled={isLoading}
										theme="primary"
										type="submit"
										invert
									>
										<Text
											text={isLoading ? t('Loading') : t('Log in')}
											textAlign="center"
											size={window.innerWidth > 768 ? 'l' : 'm'}
										/>
									</Button>
								</Flex>
							</Flex>
							{hasError && (
								<Text
									text={
										(loginError as LoginErrorType)?.data
											? (loginError as LoginErrorType).data.message
											: t('Something went wrong')
									}
									textAlign="center"
									theme="error"
								/>
							)}
						</Flex>
					</Flex>
				</Card>
			</Flex>
		</DynamicModuleLoader>
	);
});
