import styled from 'styled-components';
import { Flex } from '@/shared/ui/Flex';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';

const StyledControlPanel = styled.div`
	position: fixed;
	right: 20px;
	bottom: 20px;
`;

export const ControlPanel = () => {
	return (
		<StyledControlPanel>
			<Flex direction="column" width="auto" gap="16">
				<LangSwitcher />
				<ThemeSwitcher />
			</Flex>
		</StyledControlPanel>
	);
};
