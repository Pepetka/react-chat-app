import { memo, ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { isBrowser } from 'react-device-detect';
import { Flex } from '@/shared/ui/Flex';
import { useHover } from '@/shared/hooks/useHover';

interface IPopoverControls {
	/**
	 * Направление открытия меню
	 */
	direction?:
		| 'bottom_left'
		| 'bottom_right'
		| 'bottom_center'
		| 'top_left'
		| 'top_right'
		| 'top_center';
}

interface IPopoverProps extends IPopoverControls {
	/**
	 * Компонент, наведение на который открывает меню
	 */
	trigger?: ReactNode;
	/**
	 * Содержимое меню
	 */
	children?: ReactNode;
	/**
	 * Флаг, отвечающий за открытое состояние меню по умолчанию
	 */
	openDefault?: boolean;
}

const StyledPopover = styled.div<
	IPopoverControls & { contentWidth: number; open: boolean }
>`
	display: ${(props) => (props.open ? 'flex' : 'none')};
	justify-content: center;
	align-items: center;
	position: absolute;
	top: ${(props) =>
		props.direction?.split('_')[0] === 'bottom'
			? 'calc(100% + 6px)'
			: undefined};
	bottom: ${(props) =>
		props.direction?.split('_')[0] === 'top' ? 'calc(100% + 6px)' : undefined};
	left: ${(props) =>
		props.direction?.split('_')[1] === 'right'
			? '0'
			: props.direction?.split('_')[1] === 'center'
			? `calc(-${0.5 * props.contentWidth}px + 50%)`
			: undefined};
	right: ${(props) =>
		props.direction?.split('_')[1] === 'left' ? '0' : undefined};
	background: var(--bg-color);
	border-radius: 5px;
	border: 2px solid var(--primary-color);
	z-index: ${(props) => (props.open ? 'var(--popup-z)' : 'var(--hidden-z)')};
	pointer-events: ${(props) => (props.open ? 'auto' : 'none')};
	padding: 10px;
`;

const StyledArrow = styled.div<IPopoverControls & { open: boolean }>`
	width: 16px;
	height: 16px;
	background: var(--bg-color);
	transform: translateX(-50%)
		${(props) =>
			props.direction?.split('_')[0] === 'top'
				? 'rotateZ(225deg)'
				: 'rotateZ(45deg)'};
	border-left: 2px solid var(--primary-color);
	border-top: 2px solid var(--primary-color);
	position: absolute;
	${(props) =>
		props.direction?.split('_')[0] === 'top'
			? 'bottom: calc(100% - 1px);'
			: 'top: calc(100% - 1px);'}
	left: 50%;
	z-index: ${(props) => (props.open ? 'var(--popup-z)' : 'var(--hidden-z)')};
`;

export const Popover = memo((props: IPopoverProps) => {
	const {
		trigger,
		children,
		direction = 'bottom_right',
		openDefault = false,
	} = props;
	const { hover, onMouseOut, onMouseOver } = useHover({
		initialHover: openDefault,
	});
	const popoverRef = useRef<HTMLDivElement | null>(null);
	const [contentWidth, setContentWidth] = useState(0);

	useEffect(() => {
		if (popoverRef.current) {
			setContentWidth(popoverRef.current?.clientWidth);
		}
	}, []);

	return (
		<Flex width="auto" height="auto">
			<div onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
				{trigger}
			</div>
			<StyledPopover
				ref={popoverRef}
				onMouseOver={onMouseOver}
				onMouseOut={onMouseOut}
				direction={direction}
				contentWidth={contentWidth}
				open={isBrowser && hover}
			>
				{children}
			</StyledPopover>
			<StyledArrow direction={direction} open={isBrowser && hover} />
		</Flex>
	);
});
