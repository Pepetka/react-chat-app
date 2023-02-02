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

interface IMenuControls {
	direction?:
		| 'bottom_left'
		| 'bottom_right'
		| 'bottom_center'
		| 'top_left'
		| 'top_right'
		| 'top_center';
}

interface IMenuProps extends IMenuControls {
	trigger?: ReactNode;
	children?: ReactNode;
	width: string;
	height: string;
	openDefault?: boolean;
}

const StyledMenu = styled.div<
	IMenuControls & { contentWidth: number; open: boolean }
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
`;

export const Menu = memo((props: IMenuProps) => {
	const {
		trigger,
		children,
		height,
		width,
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

	const onKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'Escape' && openMenu) {
				setOpenMenu(false);
			}
		},
		[openMenu],
	);

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

	useEffect(() => {
		window.addEventListener('keydown', onKeyDown);
		window.addEventListener('mousedown', onMouseDown);

		return () => {
			window.removeEventListener('keydown', onKeyDown);
			window.removeEventListener('mousedown', onMouseDown);
		};
	}, [onKeyDown, onMouseDown]);

	useEffect(() => {
		if (menuRef.current) {
			setContentWidth(menuRef.current?.clientWidth);
		}
	}, []);

	return (
		<Flex width="auto" height="auto">
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
		</Flex>
	);
});
