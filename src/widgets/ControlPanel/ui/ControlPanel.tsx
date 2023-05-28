import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import { memo } from 'react';
import { Flex } from '@/shared/ui/Flex';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { Portal } from '@/shared/ui/Portal';
import { useTheme } from '@/shared/hooks/useTheme';

const StyledControlPanel = styled.div`
	position: absolute;
	right: ${() => (isMobile ? '10px' : '20px')};
	bottom: ${() =>
		isMobile ? 'calc(var(--navbar-height-mobile) + 10px)' : '20px'};
`;

export const ControlPanel = memo(() => {
	const { theme } = useTheme();

	return (
		<Portal>
			<StyledControlPanel className={theme}>
				<Flex direction="column" width="auto" gap="16">
					<LangSwitcher />
					<ThemeSwitcher />
				</Flex>
			</StyledControlPanel>
		</Portal>
	);
});
