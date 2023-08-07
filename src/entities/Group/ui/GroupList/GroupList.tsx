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
	'data-testid'?: string;
}

export const GroupList = memo((props: IChatListProps) => {
	const { groups, isError, isLoading, 'data-testid': dataTestId } = props;
	const { t } = useTranslation('group');

	if (isError && !isLoading) {
		return (
			<Flex data-testid={`${dataTestId}.error`} direction="column" gap="24">
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
			<Flex data-testid={`${dataTestId}.skeleton`} direction="column" gap="24">
				<GroupCardSkeleton />
				<GroupCardSkeleton />
				<GroupCardSkeleton />
			</Flex>
		);
	}

	return (
		<Flex direction="column" gap="24">
			{groups.map((group) => (
				<GroupCard
					data-testid={`${dataTestId}.card.${group.id}`}
					key={group.id}
					group={group}
				/>
			))}
		</Flex>
	);
});
