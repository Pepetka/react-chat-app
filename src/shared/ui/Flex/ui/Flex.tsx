import { FormEvent, ReactNode, useCallback } from 'react';
import styled from 'styled-components';

interface IFlexControls {
	/**
	 * Пропс, отвечающий за свойство justify-content
	 */
	justify?: 'center' | 'start' | 'end' | 'space-between' | 'space-around';
	/**
	 * Пропс, отвечающий за свойство align-items
	 */
	align?: 'center' | 'flex-start' | 'flex-end';
	/**
	 * Пропс, отвечающий за свойство flex-direction
	 */
	direction?: 'row' | 'column';
	/**
	 * Пропс, отвечающий за свойство gap
	 */
	gap?: '4' | '8' | '16' | '24' | '32' | '40';
	/**
	 * Ширина компонента
	 */
	width?: string;
	/**
	 * Высота компонента
	 */
	height?: string;
	/**
	 * Высота компонента
	 */
	minHeight?: string;
	/**
	 * Флаг, отвечающий за relative значение свойства position
	 */
	relative?: boolean;
	/**
	 * Пропс, отвечающий за свойство flex-wrap
	 */
	wrap?: 'wrap' | 'nowrap';
}

interface IFlexProps extends IFlexControls {
	/**
	 * Содержимое компонента
	 */
	children?: ReactNode;
	/**
	 * Тэг, оборачивающий содержимое
	 */
	FlexTag?: 'div' | 'form' | 'label' | 'ul';
	/**
	 * Функция, вызываемая при наведении на компонент
	 */
	onMouseOver?: () => void;
	/**
	 * Функция, вызываемая при выходе курсора за пределы компонента
	 */
	onMouseOut?: () => void;
	/**
	 * Id для тестирования
	 */
	'data-testid'?: string;
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
	min-height: ${(props) => props.minHeight};
	flex: 0 1 auto;
	flex-wrap: ${(props) => props.wrap};
`;

export const Flex = (props: IFlexDiv | IFlexForm) => {
	const {
		minHeight,
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
		wrap = 'nowrap',
		onMouseOut,
		onMouseOver,
		'data-testid': dataTestId,
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
			minHeight={minHeight}
			justify={justify}
			align={align}
			direction={direction}
			gap={gap}
			width={width}
			height={height}
			onSubmit={onSubmit ? onSubmitHandle : undefined}
			relative={relative}
			wrap={wrap}
			onMouseOut={onMouseOut}
			onMouseOver={onMouseOver}
			data-testid={dataTestId}
		>
			{children}
		</StyledFlex>
	);
};
