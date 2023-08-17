import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import EditIcon from '@/shared/assets/edit.svg';
import { Button } from '@/shared/ui/Button';
import { getEditProfilePagePath } from '@/shared/const/router';
import { getUserAuthData } from '@/entities/User';

interface IEditProfileButtonProps {
	theme?: 'primary' | 'outline';
	invert?: boolean;
}

export const EditProfileButton = memo((props: IEditProfileButtonProps) => {
	const { theme = 'primary', invert = false } = props;
	const navigate = useNavigate();
	const authData = useSelector(getUserAuthData);

	const onEdit = useCallback(() => {
		navigate(getEditProfilePagePath(authData?.id ?? ''));
	}, [authData?.id, navigate]);

	return (
		<Button
			data-testid="EditProfileButton"
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
