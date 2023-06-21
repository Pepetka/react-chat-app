import { memo } from 'react';
import styled from 'styled-components';
import { NavLink, NavLinkProps } from 'react-router-dom';

interface IAppLinkProps extends NavLinkProps {
	/**
	 * Ширина компонента
	 */
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
	const { children, width = 'auto', ...otherProps } = props;

	return (
		<StyledLink as={NavLink} width={width} {...otherProps}>
			{children}
		</StyledLink>
	);
});
