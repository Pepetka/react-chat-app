import { FormEvent, ReactNode, useCallback } from 'react';
import styled from 'styled-components';

interface IFlexControls {
	justify?: 'center' | 'start' | 'end' | 'space-between' | 'space-around';
	align?: 'center' | 'flex-start' | 'flex-end';
	direction?: 'row' | 'column';
	gap?: '4' | '8' | '16' | '24' | '32' | '40';
	width?: string;
	height?: string;
	relative?: boolean;
}

interface IFlexProps extends IFlexControls {
	children: ReactNode;
	FlexTag?: 'div' | 'form' | 'label' | 'ul';
	onMouseOver?: () => void;
	onMouseOut?: () => void;
}

interface IFlexDiv extends IFlexProps {
	FlexTag?: 'div' | 'label' | 'ul';
	onSubmit?: never;
}

interface IFlexForm extends IFlexProps {
	FlexTag?: 'form';
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const StyledFlex = styled.div<IFlexControls>`
	position: ${(props) => (props.relative ? 'relative' : undefined)};
	display: flex;
	justify-content: ${(props) => props.justify};
	align-items: ${(props) => props.align};
	flex-direction: ${(props) => props.direction};
	gap: ${(props) => (props.gap ? `${props.gap}px` : '0')};
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	flex: 0 1 auto;
`;

export const Flex = (props: IFlexDiv | IFlexForm) => {
	const {
		children,
		direction = 'row',
		align,
		gap,
		justify,
		FlexTag = 'div',
		width = '100%',
		height = 'auto',
		onSubmit,
		relative = true,
		onMouseOut,
		onMouseOver,
	} = props;

	const onSubmitHandle = useCallback(
		(event: FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			onSubmit?.(event);
		},
		[onSubmit],
	);

	return (
		<StyledFlex
			as={FlexTag}
			justify={justify}
			align={align}
			direction={direction}
			gap={gap}
			width={width}
			height={height}
			onSubmit={onSubmit ? onSubmitHandle : undefined}
			relative={relative}
			onMouseOut={onMouseOut}
			onMouseOver={onMouseOver}
		>
			{children}
		</StyledFlex>
	);
};
