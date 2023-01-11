import styled from 'styled-components';
import { LoginForm } from '@/features/AuthByUsername';

const LoginPageStyled = styled.div`
	color: red;
	width: 100vw;
	text-align: center;
`;

export const LoginPage = () => {
	return (
		<LoginPageStyled>
			<h1>LoginPage</h1>
			<LoginForm />
		</LoginPageStyled>
	);
};
