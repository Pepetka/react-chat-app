import { memo } from 'react';
import { getProfilePagePath } from '@/shared/const/router';
import { Flex } from '@/shared/ui/Flex';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import { AppLink } from '@/shared/ui/AppLink';
import { UserMini } from '@/shared/types/userCard';

interface IUserCardProps {
	user: UserMini;
	avatarSize?: 's' | 'm' | 'l' | 'xl';
	border?: boolean;
	theme?: 'primary' | 'invert';
	textSize?: 'm' | 'l' | 'xl';
}

export const UserCard = memo((props: IUserCardProps) => {
	const { user, avatarSize, border, theme, textSize = 'l' } = props;

	return (
		<AppLink key={user.id} href={getProfilePagePath(user.id)}>
			<Flex gap="8" align="center">
				<Avatar
					size={avatarSize}
					circle
					src={user.avatar}
					border={border}
					theme={theme}
				/>
				<Text
					text={`${user.firstname} ${user.lastname}`}
					theme="primary-invert"
					size={textSize}
				/>
			</Flex>
		</AppLink>
	);
});
