import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import CreateIcon from '@/shared/assets/create.svg';

interface ICreateGroupButtonProps {
	theme?: 'primary' | 'outline';
	invert?: boolean;
	path: string;
}

export const CreateButton = memo((props: ICreateGroupButtonProps) => {
	const { theme = 'primary', invert = false, path } = props;
	const navigate = useNavigate();

	const onCreate = useCallback(() => {
		navigate(path);
	}, [navigate, path]);

	return (
		<Button
			data-testid="CreateButton"
			aria-label="Create button"
			width="50px"
			height="50px"
			circle
			onClick={onCreate}
			theme={theme}
			invert={invert}
		>
			<Flex height="100%" justify="center" align="center">
				<Icon SvgIcon={CreateIcon} invert={!invert} size="s" />
			</Flex>
		</Button>
	);
});
