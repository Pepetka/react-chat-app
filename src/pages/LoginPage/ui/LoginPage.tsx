import { memo } from 'react';
import styled from 'styled-components';
import { authByUsernameReducer, LoginForm } from '@/features/AuthByUsername';
import { DynamicModuleLoader } from '@/shared/components';
import { Flex } from '@/shared/ui/Flex';

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
