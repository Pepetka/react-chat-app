import styled from 'styled-components';
import { memo } from 'react';
import { DynamicModuleLoader } from '@/shared/components';
import {
	registerByUsernameReducer,
	RegisterForm,
} from '@/features/RegisterByUsername';
import { Flex } from '@/shared/ui/Flex';

const StyledRegisterPage = styled.div`
	padding-top: 50px;
`;

const RegisterPage = memo(() => {
	return (
		<DynamicModuleLoader
			reducerKey="registerByUsername"
			reducer={registerByUsernameReducer}
		>
			<Flex justify="center" align="center" width="100%">
				<StyledRegisterPage>
					<RegisterForm />
				</StyledRegisterPage>
			</Flex>
		</DynamicModuleLoader>
	);
});

export default RegisterPage;
