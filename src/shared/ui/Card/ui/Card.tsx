import { ReactNode } from 'react';
import styled from 'styled-components';

interface ICardControls {
	width?: string;
	height?: string;
}

interface ICardProps extends ICardControls {
	children: ReactNode;
}

const StyledDiv = styled.div<ICardControls>`
	border-radius: 15px;
	border: var(--invert-primary-color) solid 2px;
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
	const { children, height, width } = props;

	return (
		<StyledDiv width={width} height={height}>
			{children}
		</StyledDiv>
	);
};
