import { HTMLAttributeAnchorTarget, memo, ReactNode } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

interface IAppLinkProps {
	children: ReactNode;
	href: string;
	target?: HTMLAttributeAnchorTarget;
	width?: string;
}

const StyledLink = styled.a<{ width: string }>`
	width: ${(props) => props.width};
	transition: transform 0.1s linear;
	&:hover {
		transform: scale(0.97);
	}
`;

export const AppLink = memo((props: IAppLinkProps) => {
	const { children, href, target, width = 'auto' } = props;

	return (
		<StyledLink as={NavLink} to={href} target={target} width={width}>
			{children}
		</StyledLink>
	);
});
