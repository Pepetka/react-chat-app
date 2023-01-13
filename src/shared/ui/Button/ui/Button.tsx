import { ReactNode } from 'react';
import styled from 'styled-components';

type ButtonThemeType = 'primary' | 'outline' | 'clear';

interface IButtonControls {
	theme?: ButtonThemeType;
	width?: string;
	height?: string;
	invert?: boolean;
}

interface IButtonProps extends IButtonControls {
	onClick?: () => void;
	children: ReactNode;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
}

const StyledButton = styled.button<IButtonControls>`
	font: var(--font-m);
	cursor: pointer;
	border-radius: 5px;
	background: ${(props) => {
		if (props.theme === 'primary') {
			return props.invert ? 'var(--bg-color)' : 'var(--invert-bg-color)';
		} else {
			return 'none';
		}
	}};
	color: ${(props) => {
		if (props.theme === 'primary') {
			return props.invert
				? 'var(--primary-color)'
				: 'var(--invert-primary-color)';
		} else {
			return props.invert
				? 'var(--invert-primary-color)'
				: 'var(--primary-color)';
		}
	}};
	border: ${(props) => {
		if (props.theme === 'outline') {
			return props.invert
				? '1px solid var(--invert-primary-color)'
				: '1px solid var(--primary-color)';
		} else {
			return 'none';
		}
	}};
	width: ${(props) => props.width ?? 'auto'};
	height: ${(props) => props.height ?? 'auto'};
	box-shadow: ${(props) =>
		props.theme === 'primary' ? '0px 3px 3px rgba(0,0,0,0.7)' : 'none'};
`;

export const Button = (props: IButtonProps) => {
	const {
		children,
		theme = 'primary',
		onClick,
		type = 'button',
		disabled = false,
		height,
		width,
		invert = false,
	} = props;

	return (
		<StyledButton
			theme={theme}
			onClick={onClick}
			type={type}
			width={width}
			height={height}
			disabled={disabled}
			invert={invert}
		>
			{children}
		</StyledButton>
	);
};
