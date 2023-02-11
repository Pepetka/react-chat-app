import { memo, ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Flex } from '@/shared/ui/Flex';
import { useHover } from '@/shared/hooks/useHover';

interface IPopoverControls {
	direction?:
		| 'bottom_left'
		| 'bottom_right'
		| 'bottom_center'
		| 'top_left'
		| 'top_right'
		| 'top_center';
}

interface IPopoverProps extends IPopoverControls {
	trigger?: ReactNode;
	children?: ReactNode;
	openDefault?: boolean;
}

const StyledPopover = styled.div<
	IPopoverControls & { contentWidth: number; open: boolean }
>`
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: ${(props) =>
		props.direction?.split('_')[0] === 'bottom' ? '100%' : undefined};
	bottom: ${(props) =>
		props.direction?.split('_')[0] === 'top' ? '100%' : undefined};
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
				open={hover}
			>
				{children}
			</StyledPopover>
		</Flex>
	);
});
