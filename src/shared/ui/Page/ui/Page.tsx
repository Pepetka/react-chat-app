import { ReactNode } from 'react';
import styled from 'styled-components';

interface IPageProps {
	children: ReactNode;
}

const StyledPage = styled.div`
	width: 100%;
	min-height: calc(100ch - var(--navbar-height));
	padding-block: 50px;
`;

export const Page = (props: IPageProps) => {
	const { children } = props;

	return <StyledPage>{children}</StyledPage>;
};
