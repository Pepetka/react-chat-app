import { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { Avatar } from '@/shared/ui/Avatar';
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import { AppImg } from '@/shared/ui/AppImg';
import { getMessengerPagePath } from '@/shared/const/router';
import {
	useAddFriendMutation,
	useFetchChatIdQuery,
	useFetchProfileDataQuery,
	useFetchRelationsDataQuery,
} from '../../api/profileCardApi';
import { Relations } from '../../model/types/profileCardSchema';
import { ProfileCardSkeleton } from '../ProfileCardSkeleton/ProfileCardSkeleton';

interface IProfileCardProps {
	userId: string;
	profileId: string;
}

export const ProfileCard = memo((props: IProfileCardProps) => {
	const { userId, profileId } = props;
	const { t } = useTranslation('profile');
	const {
		data: profileData,
		isFetching: profileLoading,
		error: profileError,
	} = useFetchProfileDataQuery(
		{ profileId },
		{ refetchOnMountOrArgChange: true },
	);
	const { data: chatId, isFetching: chatIdLoading } = useFetchChatIdQuery(
		{ userId, friendId: profileId },
		{ refetchOnMountOrArgChange: true },
	);
	const {
		data: relationsData,
		isLoading: relationsLoading,
		error: relationsError,
	} = useFetchRelationsDataQuery(
		{
			userId,
			friendId: profileId,
		},
		{ refetchOnMountOrArgChange: true },
	);
	const [onAddFriend, { error: addFriendError }] = useAddFriendMutation();
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const onOpenModal = useCallback(() => {
		setIsOpen(true);
	}, []);

	const onCloseModal = useCallback(() => {
		setIsOpen(false);
	}, []);

	const onSendMessage = useCallback(() => {
		if (chatId) {
			navigate(getMessengerPagePath(chatId, `friendId=${profileId}`));
		}
	}, [chatId, navigate]);

	const friendBtnText: Record<Relations['relations'], string> = useMemo(
		() => ({
			follower: 'Add friend',
			following: 'Unfollow',
			friend: 'Unfriend',
			nobody: 'Follow',
		}),
		[],
	);

	const onAddFriendHandle = useCallback(() => {
		onAddFriend({ userId, friendId: profileId });
	}, [onAddFriend, profileId, userId]);

	if (profileLoading || relationsLoading || chatIdLoading) {
		return <ProfileCardSkeleton showBtns={profileId !== userId} />;
	}

	if (profileError || relationsError || addFriendError) {
		return (
			<Card width="100%" height="400px" borderRadius={false}>
				<Flex height="100%" justify="center" align="center">
					<Text
						theme="error"
						title={t('Something went wrong')}
						TitleTag="p"
						titleAlign="center"
					/>
				</Flex>
			</Card>
		);
	}

	return (
		<Card width="100%" height="400px" borderRadius={false}>
			<Flex height="100%" gap="8">
				<Flex width="20%">
					<Text theme="secondary-invert" text={t('online')} />
				</Flex>
				<Flex direction="column" justify="space-between">
					<Flex direction="column" gap="8">
						<Text
							textAlign="right"
							theme="primary-invert"
							text={`${profileData?.[0]?.firstname} ${profileData?.[0]?.lastname}`}
							size="xl"
						/>
						<Text
							textAlign="right"
							theme="secondary-invert"
							text={`id:${profileData?.[0]?.id}`}
							size="m"
						/>
						<Text
							textAlign="right"
							theme="primary-invert"
							text={profileData?.[0]?.status}
							size="l"
						/>
					</Flex>
					{profileId !== userId && (
						<Flex justify="end" gap="24">
							<Button
								onClick={onAddFriendHandle}
								width="180px"
								height="50px"
								invert
							>
								<Text
									textAlign="center"
									size="l"
									text={t(friendBtnText[relationsData?.relations ?? 'nobody'])}
								/>
							</Button>
							<Button
								onClick={onSendMessage}
								width="180px"
								height="50px"
								invert
							>
								<Text textAlign="center" size="l" text={t('Send mess')} />
							</Button>
						</Flex>
					)}
				</Flex>
				<Avatar
					src={profileData?.[0]?.avatar ?? ''}
					size="xl"
					onClick={onOpenModal}
				/>
				<Modal isOpen={isOpen} onCloseModal={onCloseModal}>
					<AppImg
						width="700px"
						src={profileData?.[0]?.avatar ?? ''}
						alt={t('Avatar')}
						errorFallback={
							<Text
								text={t('Something went wrong')}
								size="l"
								textAlign="center"
							/>
						}
					/>
				</Modal>
			</Flex>
		</Card>
	);
});
