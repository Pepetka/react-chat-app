import {
	memo,
	ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import styled from 'styled-components';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { useKeyboardEvent } from '@/shared/hooks/useKeyboardEvent';

interface IMenuControls {
	/**
	 * Направление, в котором открывается меню
	 */
	direction?:
		| 'bottom_left'
		| 'bottom_right'
		| 'bottom_center'
		| 'top_left'
		| 'top_right'
		| 'top_center';
}

interface IMenuProps extends IMenuControls {
	/**
	 * Компонент, нажатие на который, открывается меню
	 */
	trigger?: ReactNode;
	/**
	 * Содержимое меню
	 */
	children?: ReactNode;
	/**
	 * Ширина меню
	 */
	width?: string;
	/**
	 * Высота меню
	 */
	height?: string;
	/**
	 * Флаг, отвечающий за открытое состояние меню по умолчанию
	 */
	openDefault?: boolean;
}

const StyledMenu = styled.div<
	IMenuControls & { contentWidth: number; open: boolean }
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
	pointer-events: ${(props) => (props.open ? 'auto' : 'none')};
	z-index: ${(props) => (props.open ? 'var(--popup-z)' : 'var(--hidden-z)')};
`;

const StyledArrow = styled.div<IMenuControls & { open: boolean }>`
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

export const Menu = memo((props: IMenuProps) => {
	const {
		trigger,
		children,
		height = 'auto',
		width = 'auto',
		direction = 'bottom_right',
		openDefault = false,
	} = props;
	const [openMenu, setOpenMenu] = useState(openDefault);
	const triggerRef = useRef<HTMLButtonElement | null>(null);
	const menuRef = useRef<HTMLDivElement | null>(null);
	const [contentWidth, setContentWidth] = useState(0);

	const onToggleMenu = useCallback(() => {
		setOpenMenu((prev) => !prev);
	}, []);

	const onMouseDown = useCallback(
		(event: MouseEvent) => {
			if (
				openMenu &&
				triggerRef.current &&
				!triggerRef.current.contains(event.target as Node) &&
				menuRef.current &&
				!menuRef.current.contains(event.target as Node)
			) {
				setOpenMenu(false);
			}
		},
		[openMenu],
	);

	useKeyboardEvent({
		addCondition: openMenu,
		callback: onToggleMenu,
	});

	useEffect(() => {
		window.addEventListener('mousedown', onMouseDown);

		return () => {
			window.removeEventListener('mousedown', onMouseDown);
		};
	}, [onMouseDown]);

	useEffect(() => {
		if (menuRef.current) {
			setContentWidth(menuRef.current?.clientWidth);
		}
	}, []);

	return (
		<Flex width={width} height={height}>
			<Button
				onClick={onToggleMenu}
				theme="clear"
				width={width}
				height={height}
				ref={triggerRef}
			>
				{trigger}
			</Button>
			<StyledMenu
				contentWidth={contentWidth}
				ref={menuRef}
				direction={direction}
				open={openMenu}
			>
				{children}
			</StyledMenu>
			<StyledArrow direction={direction} open={openMenu} />
		</Flex>
	);
});
