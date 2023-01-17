import { ReactNode } from 'react';
import styled from 'styled-components';

interface ICardControls {
	width?: string;
	height?: string;
	border?: boolean;
	borderRadius?: boolean;
}

interface ICardProps extends ICardControls {
	children: ReactNode;
}

const StyledDiv = styled.div<ICardControls>`
	border-radius: ${(props) => (props.borderRadius ? '25px' : '0 0 25px 25px')};
	border: ${(props) =>
		props.border ? 'var(--invert-primary-color) solid 4px' : 'none'};
	color: var(--invert-primary-color);
	background: var(--invert-bg-color);
	padding: 20px;
	width: ${(props) => props.width ?? 'auto'};
	height: ${(props) => props.height ?? 'auto'};
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Card = (props: ICardProps) => {
	const {
		children,
		height,
		width,
		border = false,
		borderRadius = true,
	} = props;

	return (
		<StyledDiv
			width={width}
			height={height}
			border={border}
			borderRadius={borderRadius}
		>
			{children}
		</StyledDiv>
	);
};
