import styled from 'styled-components';
import { memo } from 'react';
import { Flex } from '@/shared/ui/Flex';
import { RegisterForm } from '@/features/RegisterByUsername';

const StyledRegisterPage = styled.div`
	padding-top: 50px;
`;

const RegisterPage = memo(() => {
	return (
		<Flex justify="center" align="center" width="100%">
			<StyledRegisterPage>
				<RegisterForm />
			</StyledRegisterPage>
		</Flex>
	);
});

export default RegisterPage;
