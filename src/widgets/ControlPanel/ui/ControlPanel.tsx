import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import { memo, useCallback, useEffect, useState } from 'react';
import { Flex } from '@/shared/ui/Flex';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { Portal } from '@/shared/ui/Portal';
import { useTheme } from '@/shared/hooks/useTheme';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import GearIcon from '@/shared/assets/gear.svg';
import { root } from '@/main';

const StyledControlPanel = styled.div`
	position: absolute;
	right: ${() => (isMobile ? '10px' : '20px')};
	bottom: ${() => (isMobile ? 'calc(100dvh / 2)' : '20px')};
`;

const AnimatedLang = styled.div<{ opened: boolean }>`
	position: absolute;
	right: 0;
	top: 0;
	transform: translateX(${(props) => (props.opened ? '-132px' : '0')});
	opacity: ${(props) => (props.opened ? 1 : 0)};
	pointer-events: ${(props) => (props.opened ? 'auto' : 'none')};
	transition: all 0.3s linear;
`;

const AnimatedTheme = styled.div<{ opened: boolean }>`
	position: absolute;
	right: 0;
	top: 0;
	transform: translateX(${(props) => (props.opened ? '-66px' : '0')});
	opacity: ${(props) => (props.opened ? 1 : 0)};
	pointer-events: ${(props) => (props.opened ? 'auto' : 'none')};
	transition: all 0.3s linear;
`;

const AnimatedGear = styled.div<{ opened: boolean }>`
	opacity: ${(props) => (props.opened ? 1 : '0.5')};
	transition: all 0.3s linear;
`;

const AnimatedSvg = styled.div<{ opened: boolean }>`
	transform: ${(props) =>
		props.opened ? 'rotateZ(-180deg)' : 'rotateZ(0deg)'};
	transition: all 0.3s linear;
`;

export const ControlPanel = memo(() => {
	const { theme } = useTheme();
	const [opened, setOpened] = useState(false);

	const onSwitch = useCallback(() => {
		setOpened((opened) => !opened);
	}, []);

	useEffect(() => {
		if (opened) {
			root.addEventListener('click', onSwitch);
		} else {
			root.removeEventListener('click', onSwitch);
		}

		return () => {
			root.removeEventListener('click', onSwitch);
		};
	}, [onSwitch, opened]);

	return (
		<Portal>
			<StyledControlPanel className={theme}>
				<Flex width="auto" gap="16">
					<AnimatedLang opened={opened}>
						<LangSwitcher />
					</AnimatedLang>
					<AnimatedTheme opened={opened}>
						<ThemeSwitcher />
					</AnimatedTheme>
					<AnimatedGear opened={opened}>
						<Button width="50px" height="50px" circle onClick={onSwitch}>
							<AnimatedSvg opened={opened}>
								<Flex height="100%" justify="center" align="center">
									<Icon SvgIcon={GearIcon} invert={true} size="s" />
								</Flex>
							</AnimatedSvg>
						</Button>
					</AnimatedGear>
				</Flex>
			</StyledControlPanel>
		</Portal>
	);
});
