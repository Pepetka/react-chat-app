import { memo, ReactNode, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

interface IMenuControls {
	direction?: 'bottom_left' | 'bottom_right' | 'top_left' | 'top_right';
}

interface IMenuProps extends IMenuControls {
	trigger?: ReactNode;
	children?: ReactNode;
	width: string;
	height: string;
	openDefault?: boolean;
}

const StyledMenu = styled.div<IMenuControls & { openMenu: boolean }>`
	display: ${(props) => (props.openMenu ? 'flex' : 'none')};
	justify-content: center;
	align-items: center;
	position: absolute;
	top: ${(props) =>
		props.direction?.split('_')[0] === 'bottom' ? '100%' : undefined};
	bottom: ${(props) =>
		props.direction?.split('_')[0] === 'top' ? '100%' : undefined};
	left: ${(props) =>
		props.direction?.split('_')[1] === 'right' ? '0' : undefined};
	right: ${(props) =>
		props.direction?.split('_')[1] === 'left' ? '0' : undefined};
	background: var(--bg-color);
	border-radius: 5px;
	border: 2px solid var(--primary-color);
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

	const onToggleMenu = useCallback(() => {
		setOpenMenu((prev) => !prev);
	}, []);

	return (
		<Flex width="auto" height="auto">
			<Button
				onClick={onToggleMenu}
				theme="clear"
				width={width}
				height={height}
			>
				{trigger}
			</Button>
			<StyledMenu direction={direction} openMenu={openMenu}>
				{children}
			</StyledMenu>
		</Flex>
	);
});
