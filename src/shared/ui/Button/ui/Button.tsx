import { ButtonHTMLAttributes, ForwardedRef, forwardRef, memo } from 'react';
import styled from 'styled-components';

type ButtonThemeType = 'primary' | 'outline' | 'clear';

interface IButtonControls {
	/**
	 * Тема кнопки
	 */
	theme?: ButtonThemeType;
	/**
	 * Ширина кнопки
	 */
	width?: string;
	/**
	 * Высота кнопки
	 */
	height?: string;
	/**
	 * Флаг, отвечающий за инвертирование темы
	 */
	invert?: boolean;
	/**
	 * Флаг, отвечающий за округлую форму кнопки
	 */
	circle?: boolean;
	/**
	 * Флаг, отвечающий за наличие padding-inline
	 */
	padding?: boolean;
}

interface IButtonProps
	extends IButtonControls,
		ButtonHTMLAttributes<HTMLButtonElement> {
	'data-testid'?: string;
}

const StyledButton = styled.button<IButtonControls>`
	padding-inline: ${(props) => (props.padding ? '20px' : 'none')};
	font: var(--font-m);
	cursor: pointer;
	border-radius: ${(props) => (props.circle ? '50%' : '8px')};
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
				? '4px solid var(--invert-primary-color)'
				: '4px solid var(--primary-color)';
		} else {
			return 'none';
		}
	}};
	width: ${(props) => props.width ?? 'auto'};
	height: ${(props) => props.height ?? 'auto'};
	box-shadow: ${(props) =>
		props.theme === 'primary' ? '0px 3px 3px rgba(0,0,0,0.7)' : 'none'};
	display: flex;
	justify-content: center;
	align-items: center;

	@media (min-width: 768px) {
		&:hover {
			transform: scale(0.95);
			transition: transform 0.1s linear;
		}
	}
`;

export const Button = memo(
	forwardRef((props: IButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
		const {
			children,
			theme = 'primary',
			type = 'button',
			height,
			width,
			invert = false,
			circle = false,
			'data-testid': dataTestId,
			...otherProps
		} = props;

		return (
			<StyledButton
				data-testid={dataTestId}
				theme={theme}
				type={type}
				width={width}
				height={height}
				invert={invert}
				circle={circle}
				ref={ref}
				{...otherProps}
			>
				{children}
			</StyledButton>
		);
	}),
);
