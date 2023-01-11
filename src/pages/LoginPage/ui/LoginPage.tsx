import styled from 'styled-components';
import { authByUsernameReducer, LoginForm } from '@/features/AuthByUsername';
import { DynamicModuleLoader } from '@/shared/components';
import { memo } from 'react';

const LoginPageStyled = styled.div`
	color: red;
	width: 100vw;
	text-align: center;
`;

export const LoginPage = memo(() => {
	return (
		<DynamicModuleLoader
			reducerKey="authByUsername"
			reducer={authByUsernameReducer}
		>
			<LoginPageStyled>
				<h1>LoginPage</h1>
				<LoginForm />
			</LoginPageStyled>
		</DynamicModuleLoader>
	);
});
