import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { GroupCardSkeleton } from '../GroupCardSkeleton/GroupCardSkeleton';
import { GroupCard } from '../GroupCard/GroupCard';
import { Group } from '../../model/types/groupSchema';

interface IChatListProps {
	groups?: Array<Group>;
	isLoading: boolean;
	isError: boolean;
}

export const GroupList = memo((props: IChatListProps) => {
	const { groups, isError, isLoading } = props;
	const { t } = useTranslation('chats');

	if (isError && !isLoading) {
		return (
			<Flex direction="column" gap="24">
				<Text
					text={t('Something went wrong')}
					theme="error"
					size="l"
					textAlign="center"
				/>
			</Flex>
		);
	}

	if (isLoading || !groups) {
		return (
			<Flex direction="column" gap="24">
				<GroupCardSkeleton />
				<GroupCardSkeleton />
				<GroupCardSkeleton />
			</Flex>
		);
	}

	return (
		<Flex direction="column" gap="24">
			{groups.map((group) => (
				<GroupCard key={group.id} group={group} />
			))}
		</Flex>
	);
});
