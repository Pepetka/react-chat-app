import { HTMLAttributeAnchorTarget, memo, ReactNode } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

interface IAppLinkProps {
	children: ReactNode;
	href: string;
	target?: HTMLAttributeAnchorTarget;
}

const StyledLink = styled.a`
	transition: transform 0.1s linear;
	&:hover {
		transform: scale(0.97);
	}
`;

export const AppLink = memo((props: IAppLinkProps) => {
	const { children, href, target } = props;

	return (
		<StyledLink as={NavLink} to={href} target={target}>
			{children}
		</StyledLink>
	);
});
