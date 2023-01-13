import { ReactNode } from 'react';
import styled from 'styled-components';

interface IFlexControls {
	justify?: 'center' | 'start' | 'end' | 'space-between' | 'space-around';
	align?: 'center' | 'flex-start' | 'flex-end';
	direction?: 'row' | 'column';
	gap?: '4' | '8' | '16' | '24' | '32' | '40';
	width?: string;
}

interface IFlexProps extends IFlexControls {
	children: ReactNode;
	FlexTag?: 'div' | 'form';
}

const StyledFlex = styled.div<IFlexControls>`
	display: flex;
	justify-content: ${(props) => props.justify};
	align-items: ${(props) => props.align};
	flex-direction: ${(props) => props.direction};
	gap: ${(props) => (props.gap ? `${props.gap}px` : '0')};
	width: ${(props) => props.width};
`;

export const Flex = (props: IFlexProps) => {
	const {
		children,
		direction = 'row',
		align,
		gap,
		justify,
		FlexTag = 'div',
		width = '100%',
	} = props;

	return (
		<StyledFlex
			as={FlexTag}
			justify={justify}
			align={align}
			direction={direction}
			gap={gap}
			width={width}
		>
			{children}
		</StyledFlex>
	);
};
