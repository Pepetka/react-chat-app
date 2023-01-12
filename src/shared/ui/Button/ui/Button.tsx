import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

type ButtonThemeType = 'primary' | 'outline' | 'clear';

interface IButtonControls {
	theme?: ButtonThemeType;
	width?: string;
	height?: string;
}

type ButtonPropsType = IButtonControls &
	ButtonHTMLAttributes<HTMLButtonElement>;

const StyledButton = styled.button<IButtonControls>`
	cursor: pointer;
	border-radius: 5px;
	background: ${(props) =>
		props.theme === 'primary' ? 'var(--invert-bg-color)' : 'none'};
	color: ${(props) =>
		props.theme === 'primary'
			? 'var(--invert-primary-color)'
			: 'var(--primary-color)'};
	border: ${(props) =>
		props.theme === 'outline' ? '1px solid var(--primary-color)' : 'none'};
	width: ${(props) => props.width ?? 'auto'};
	height: ${(props) => props.height ?? 'auto'};
	box-shadow: ${(props) =>
		props.theme === 'primary' ? '0px 3px 3px rgba(0,0,0,0.7)' : 'none'};
`;

export const Button = (props: ButtonPropsType) => {
	const { children, theme = 'primary', ...otherProps } = props;

	return (
		<StyledButton theme={theme} {...otherProps}>
			{children}
		</StyledButton>
	);
};
