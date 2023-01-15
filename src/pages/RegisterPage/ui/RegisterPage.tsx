import { DynamicModuleLoader } from '@/shared/components';
import {
	registerByUsernameReducer,
	RegisterForm,
} from '@/features/RegisterByUsername';
import { Flex } from '@/shared/ui/Flex';
import { Page } from '@/shared/ui/Page';

const RegisterPage = () => {
	return (
		<Page>
			<DynamicModuleLoader
				reducerKey="registerByUsername"
				reducer={registerByUsernameReducer}
			>
				<Flex justify="center" align="center" width="100%" height="100%">
					<RegisterForm />
				</Flex>
			</DynamicModuleLoader>
		</Page>
	);
};

export default RegisterPage;
