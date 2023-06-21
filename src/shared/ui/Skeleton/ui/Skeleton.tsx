import { memo } from 'react';
import styled, { keyframes } from 'styled-components';

interface ISkeletonControls {
	/**
	 * Ширина компонента
	 */
	width?: string;
	/**
	 * Высота компонента
	 */
	height?: string;
	/**
	 * Флаг, отвечающий за инвертирование цвета компонента
	 */
	invert?: boolean;
	/**
	 * Флаг, отвечающий за округлую форму компонента
	 */
	circle?: boolean;
	/**
	 * Значение margin
	 */
	margin?: string;
	/**
	 * Значение border-radius
	 */
	borderRadius?: string;
	/**
	 * Флаг, отвечающий за квадратную форму компонента
	 */
	square?: boolean;
}

type ISkeletonProps = ISkeletonControls;

const translate = keyframes`
	100% {
		transform: translateX(100%);
	}
`;

const StyledSkeleton = styled.div<ISkeletonControls>`
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	aspect-ratio: ${(props) => (props.square ? '1/1' : undefined)};
	border-radius: ${(props) => (props.circle ? '50%' : props.borderRadius)};
	display: inline-block;
	position: relative;
	overflow: hidden;
	margin-block: ${(props) => props.margin};
	background-color: ${(props) =>
		props.invert
			? 'var(--invert-skeleton-bg-color)'
			: 'var(--skeleton-bg-color)'};

	&::after {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		transform: translateX(-100%);
		background-image: linear-gradient(
			90deg,
			transparent 0%,
			rgba(
					${(props) =>
						props.invert
							? 'var(--invert-bg-color-rgb)'
							: 'var(--bg-color-rgb)'},
					0.2
				)
				20%,
			rgba(
					${(props) =>
						props.invert
							? 'var(--invert-bg-color-rgb)'
							: 'var(--bg-color-rgb)'},
					0.5
				)
				60%,
			transparent 100%
		);
		animation: ${translate} 1s infinite;
		content: '';
	}
`;

export const Skeleton = memo((props: ISkeletonProps) => {
	const {
		width = '100%',
		height = 'auto',
		square,
		invert = true,
		circle = false,
		margin,
		borderRadius = 'none',
	} = props;

	return (
		<StyledSkeleton
			height={height}
			width={width}
			invert={invert}
			circle={circle}
			square={square}
			margin={margin}
			borderRadius={borderRadius}
		/>
	);
});
