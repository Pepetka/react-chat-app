import { authByUsernameReducer, LoginForm } from '@/features/AuthByUsername';
import { DynamicModuleLoader } from '@/shared/components';
import { memo } from 'react';
import { Flex } from '@/shared/ui/Flex';
import { Page } from '@/shared/ui/Page';

const LoginPage = memo(() => {
	return (
		<Page>
			<DynamicModuleLoader
				reducerKey="authByUsername"
				reducer={authByUsernameReducer}
			>
				<Flex justify="center" align="center" width="100%" height="100%">
					<LoginForm />
				</Flex>
			</DynamicModuleLoader>
		</Page>
	);
});

export default LoginPage;