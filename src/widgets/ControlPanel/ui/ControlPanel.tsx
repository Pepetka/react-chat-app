import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import { Flex } from '@/shared/ui/Flex';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { Portal } from '@/shared/ui/Portal';
import { useTheme } from '@/shared/hooks/useTheme';

const StyledControlPanel = styled.div`
	position: absolute;
	right: 20px;
	bottom: ${() => (isMobile ? 'calc(var(--navbar-height) + 20px)' : '20px')};
`;

export const ControlPanel = () => {
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
};
