import { memo, ReactNode, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

interface IMenuProps {
	trigger?: ReactNode;
	children?: ReactNode;
	width: string;
	height: string;
}

const StyledMenu = styled.div<{ openMenu: boolean }>`
	display: ${(props) => (props.openMenu ? 'flex' : 'none')};
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
	left: -140px;
	background: var(--bg-color);
	border-radius: 5px;
	border: 2px solid var(--primary-color);
`;

export const Menu = memo((props: IMenuProps) => {
	const { trigger, children, height, width } = props;
	const [openMenu, setOpenMenu] = useState(false);

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
			<StyledMenu openMenu={openMenu}>{children}</StyledMenu>
		</Flex>
	);
});
