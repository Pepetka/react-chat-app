import { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
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
	useFetchOnlineQuery,
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
	const isBigScreen = useMediaQuery({ minWidth: 1400 });
	const isSmallestScreen = useMediaQuery({ maxWidth: 540 });
	const isDesktopOrLaptop = useMediaQuery({ minWidth: 1200 });
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
	const { data: online } = useFetchOnlineQuery();
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
	}, [chatId, navigate, profileId]);

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
		return (
			<ProfileCardSkeleton
				data-testid={'ProfileCard.skeleton'}
				showBtns={profileId !== userId}
			/>
		);
	}

	if (profileError || relationsError || addFriendError) {
		return (
			<Card
				data-testid="ProfileCard.error"
				width="100%"
				height="400px"
				borderRadius={false}
			>
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
		<Card
			data-testid="ProfileCard.card"
			width="100%"
			minHeight="400px"
			borderRadius={false}
		>
			<Flex wrap="wrap" height="100%" justify="space-between">
				<Flex width="80px">
					<Text
						theme="secondary-invert"
						text={t(online?.includes(profileId) ? 'online' : 'offline')}
					/>
				</Flex>
				<Flex
					wrap="wrap"
					width={isBigScreen ? 'auto' : '100%'}
					gap="8"
					justify="center"
				>
					<Flex
						width={isSmallestScreen ? '100%' : 'auto'}
						direction="column"
						justify="space-between"
						align="center"
						gap="8"
					>
						<Flex direction="column" gap="8">
							<Text
								textAlign="right"
								theme="primary-invert"
								text={`${profileData?.firstname} ${profileData?.lastname}`}
								size="xl"
							/>
							<Text
								textAlign="right"
								theme="secondary-invert"
								text={`id:${profileData?.id}`}
								size="m"
							/>
							<Text
								width={isSmallestScreen ? '100%' : '500px'}
								textAlign="right"
								theme="primary-invert"
								text={profileData?.status ?? ''}
								size="l"
							/>
						</Flex>
						{!isBigScreen && (
							<Flex width="auto">
								<Avatar
									src={profileData?.avatar ?? ''}
									size="xl"
									onClick={onOpenModal}
								/>
							</Flex>
						)}
						{profileId !== userId && (
							<Flex justify={isBigScreen ? 'end' : 'center'} gap="24">
								<Button
									onClick={onAddFriendHandle}
									width={isDesktopOrLaptop ? '180px' : '150px'}
									height={isDesktopOrLaptop ? '50px' : '32px'}
									invert
								>
									<Text
										textAlign="center"
										size={isDesktopOrLaptop ? 'l' : 'm'}
										text={t(
											friendBtnText[relationsData?.relations ?? 'nobody'],
										)}
									/>
								</Button>
								<Button
									onClick={onSendMessage}
									width={isDesktopOrLaptop ? '180px' : '150px'}
									height={isDesktopOrLaptop ? '50px' : '32px'}
									invert
								>
									<Text
										textAlign="center"
										size={isDesktopOrLaptop ? 'l' : 'm'}
										text={t('Send mess')}
									/>
								</Button>
							</Flex>
						)}
					</Flex>
					{isBigScreen && (
						<Flex width="auto">
							<Avatar
								src={profileData?.avatar ?? ''}
								size="xl"
								onClick={onOpenModal}
							/>
						</Flex>
					)}
				</Flex>
				<Modal isOpen={isOpen} onCloseModal={onCloseModal}>
					<AppImg
						width="700px"
						height="700px"
						full={!isBigScreen}
						src={profileData?.avatar ?? ''}
						alt={t('Avatar')}
					/>
				</Modal>
			</Flex>
		</Card>
	);
});
