import { authByUsernameReducer, LoginForm } from '@/features/AuthByUsername';
import { DynamicModuleLoader } from '@/shared/components';
import { memo } from 'react';
import { Flex } from '@/shared/ui/Flex';
import styled from 'styled-components';

const StyledLoginPage = styled.div`
	padding-top: 50px;
`;

const LoginPage = memo(() => {
	return (
		<DynamicModuleLoader
			reducerKey="authByUsername"
			reducer={authByUsernameReducer}
		>
			<Flex justify="center" align="center" width="100%">
				<StyledLoginPage>
					<LoginForm />
				</StyledLoginPage>
			</Flex>
		</DynamicModuleLoader>
	);
});

export default LoginPage;
