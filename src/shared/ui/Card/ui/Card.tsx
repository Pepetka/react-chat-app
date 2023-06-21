import { ReactNode } from 'react';
import styled from 'styled-components';

interface ICardControls {
	/**
	 * Ширина карточки
	 */
	width?: string;
	/**
	 * Высота карточки
	 */
	height?: string;
	/**
	 * Минимальная высота карточки
	 */
	minHeight?: string;
	/**
	 * Флаг, отвечающий за наличие border
	 */
	border?: boolean;
	/**
	 * Флаг, отвечающий за наличие скруглений углов
	 */
	borderRadius?: boolean;
	/**
	 * Величина padding
	 */
	padding?: string;
	/**
	 * Флаг, отвечающий за инвертирование цвета карточки
	 */
	invert?: boolean;
	/**
	 * Флаг, отвечающий за возможность скролить содержимое карточки
	 */
	scrollContent?: boolean;
}

interface ICardProps extends ICardControls {
	/**
	 * Содержимое карточки
	 */
	children: ReactNode;
}

export const StyledCard = styled.div<ICardControls>`
	${(props) =>
		props.scrollContent ? 'flex: 1;\n	overflow: hidden;' : undefined}
	border-radius: ${(props) => (props.borderRadius ? '25px' : '0 0 25px 25px')};
	border: ${(props) =>
		props.border
			? props.invert
				? 'var(--primary-color) solid 4px'
				: 'var(--invert-primary-color) solid 4px'
			: 'none'};
	color: ${(props) =>
		props.invert ? 'var(--primary-color)' : 'var(--invert-primary-color)'};
	background: ${(props) =>
		props.invert ? 'var(--bg-color)' : 'var(--invert-bg-color)'};
	padding: ${(props) => props.padding ?? '0'};
	width: ${(props) => props.width ?? 'auto'};
	height: ${(props) => props.height ?? 'auto'};
	min-height: ${(props) => props.minHeight ?? 'auto'};
`;

export const Card = (props: ICardProps) => {
	const {
		children,
		height,
		minHeight,
		width,
		border = false,
		borderRadius = true,
		padding = '20px',
		invert = false,
		scrollContent = false,
	} = props;

	return (
		<StyledCard
			invert={invert}
			width={width}
			height={height}
			minHeight={minHeight}
			border={border}
			borderRadius={borderRadius}
			padding={padding}
			scrollContent={scrollContent}
		>
			{children}
		</StyledCard>
	);
};
