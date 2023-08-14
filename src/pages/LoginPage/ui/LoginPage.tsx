import { memo } from 'react';
import styled from 'styled-components';
import { Flex } from '@/shared/ui/Flex';
import { LoginForm } from '@/features/AuthByUsername';

const StyledLoginPage = styled.div`
	padding-top: 50px;
`;

const LoginPage = memo(() => {
	return (
		<Flex data-testid="LoginPage" justify="center" align="center" width="100%">
			<StyledLoginPage>
				<LoginForm />
			</StyledLoginPage>
		</Flex>
	);
});

export default LoginPage;
