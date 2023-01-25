import { HTMLAttributeAnchorTarget, memo, ReactNode } from 'react';
import styled from 'styled-components';

interface IAppLinkProps {
	children: ReactNode;
	key?: string;
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
	const { children, key, href, target } = props;

	return (
		<StyledLink key={key} href={href} target={target}>
			{children}
		</StyledLink>
	);
});
