import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import EditIcon from '@/shared/assets/edit.svg';
import { Button } from '@/shared/ui/Button';

interface IEditProfileButtonProps {
	theme?: 'primary' | 'outline';
	invert?: boolean;
	path: string;
}

export const EditButton = memo((props: IEditProfileButtonProps) => {
	const { theme = 'primary', invert = false, path } = props;
	const navigate = useNavigate();

	const onEdit = useCallback(() => {
		navigate(path);
	}, [navigate, path]);

	return (
		<Button
			data-testid="EditButton"
			aria-label="Edit button"
			width="50px"
			height="50px"
			circle
			onClick={onEdit}
			theme={theme}
			invert={invert}
		>
			<Flex height="100%" justify="center" align="center">
				<Icon SvgIcon={EditIcon} invert={!invert} size="s" />
			</Flex>
		</Button>
	);
});
