import { rtkApi } from '@/shared/api/rtkApi';
import { UserMini } from '@/shared/types/userCard';
import { Messages } from '@/entities/Message';
import { getSocket } from '@/shared/api/socketApi';
import { socketError } from '@/shared/config/RTKQuery/socketError';

interface IMessengerPageApiProps {
	chatId: string;
	userId: string;
	friendId: string;
}

export const messengerPageApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchMessages: build.query<
			{ messages: Messages; friend: UserMini },
			IMessengerPageApiProps
		>({
			queryFn: () => {
				return {
					data: { messages: [], friend: { avatar: '', id: '', name: '' } },
				};
			},
			async onCacheEntryAdded(
				arg,
				{
					updateCachedData,
					cacheDataLoaded,
					cacheEntryRemoved,
					requestId,
					dispatch,
				},
			) {
				try {
					await cacheDataLoaded;

					const socket = getSocket();

					socket.emit('get_messages', arg);

					socket.on(
						'messages',
						(data: {
							messages: Messages;
							chatMembers: Record<string, UserMini>;
						}) => {
							updateCachedData((draft) => {
								draft.messages = data.messages.map(([date, messages]) => [
									date,
									messages.map((message) => ({
										...message,
										img: message.img?.map((img) => `${__API__}/images/${img}`),
									})),
								]);
								draft.friend = {
									...data.chatMembers[arg.friendId],
									avatar: `${__API__}/images/${
										data.chatMembers[arg.friendId].avatar
									}`,
								};
							});
						},
					);

					await cacheEntryRemoved;

					socket.off('messages');
				} catch (e) {
					console.error(e);

					dispatch(
						socketError({
							arg,
							requestId,
							error: e as Error,
							endpointName: 'fetchMessages',
						}),
					);
				}
			},
		}),
		joinChat: build.mutation<void, string>({
			queryFn: async (chatId) => {
				const socket = getSocket();
				socket.emit('join_chat', chatId);

				return { data: undefined };
			},
		}),
		leaveChat: build.mutation<void, string>({
			queryFn: async (chatId) => {
				const socket = getSocket();
				socket.emit('leave_chat', chatId);

				return { data: undefined };
			},
		}),
		fetchOnline: build.query<Array<string>, void>({
			queryFn: () => {
				return { data: [] };
			},
			async onCacheEntryAdded(
				arg,
				{
					updateCachedData,
					cacheDataLoaded,
					cacheEntryRemoved,
					requestId,
					dispatch,
				},
			) {
				try {
					await cacheDataLoaded;

					const socket = getSocket();

					socket.emit('online');

					socket.on('online', (data: Array<string>) => {
						updateCachedData(() => {
							return data;
						});
					});

					await cacheEntryRemoved;

					socket.off('online');
				} catch (e) {
					console.error(e);

					dispatch(
						socketError({
							arg,
							requestId,
							error: e as Error,
							endpointName: 'fetchOnline',
						}),
					);
				}
			},
		}),
		typingMessage: build.mutation<void, string>({
			queryFn: async (chatId) => {
				const socket = getSocket();
				socket.emit('typing', chatId);

				return { data: undefined };
			},
		}),
		stopTyping: build.mutation<void, string>({
			queryFn: async (chatId) => {
				const socket = getSocket();
				socket.emit('stop_typing', chatId);

				return { data: undefined };
			},
		}),
		friendTyping: build.query<{ friendId: string; isTyping: boolean }, void>({
			queryFn: () => {
				return { data: { friendId: '', isTyping: false } };
			},
			async onCacheEntryAdded(
				arg,
				{
					updateCachedData,
					cacheDataLoaded,
					cacheEntryRemoved,
					requestId,
					dispatch,
				},
			) {
				try {
					await cacheDataLoaded;

					const socket = getSocket();

					socket.on(
						'typing',
						(data: { friendId: string; isTyping: boolean }) => {
							updateCachedData(() => {
								return data;
							});
						},
					);

					await cacheEntryRemoved;

					socket.off('typing');
				} catch (e) {
					console.error(e);

					dispatch(
						socketError({
							arg,
							requestId,
							error: e as Error,
							endpointName: 'friendTyping',
						}),
					);
				}
			},
		}),
		sendMessage: build.mutation<
			string,
			IMessengerPageApiProps & { text?: string; files?: FileList }
		>({
			queryFn: async (data) => {
				const socket = getSocket();
				let filesArray: Array<{ name: string; file: File }> | undefined;
				if (data.files) {
					filesArray = Array.from(data.files).map((file) => ({
						name: file.name,
						file,
					}));
				}
				socket.emit('new_message', { ...data, files: filesArray });

				return { data: '' };
			},
			// async onQueryStarted(
			// 	{ chatId, userId, text, img, friendId },
			// 	{ dispatch, queryFulfilled, getState },
			// ) {
			// 	const authData = getUserAuthData(getState() as StateSchema);
			//
			// 	const patchResult = dispatch(
			// 		messengerPageApi.util.updateQueryData(
			// 			'fetchMessages',
			// 			{ chatId, userId, friendId },
			// 			(draft) => {
			// 				const currentDate = new Date().toLocaleDateString();
			//
			// 				if (draft.messages?.find(([date]) => date === currentDate)) {
			// 					const index = draft.messages.findIndex(
			// 						([date]) => date === currentDate,
			// 					);
			// 					draft.messages[index][1].push({
			// 						authorId: userId,
			// 						name: `${authData!.firstname} ${authData!.lastname}`,
			// 						text,
			// 						img,
			// 						time: `${new Date().getHours()}:${new Date().getMinutes()}`,
			// 					});
			// 				} else {
			// 					draft.messages = [
			// 						...(draft.messages ? draft.messages : []),
			// 						[
			// 							currentDate,
			// 							[
			// 								{
			// 									authorId: userId,
			// 									name: `${authData!.firstname} ${authData!.lastname}`,
			// 									text,
			// 									img,
			// 									time: `${new Date().getHours()}:${new Date().getMinutes()}`,
			// 								},
			// 							],
			// 						],
			// 					];
			// 				}
			// 			},
			// 		),
			// 	);
			// 	try {
			// 		await queryFulfilled;
			// 	} catch {
			// 		patchResult.undo();
			// 	}
			// },
		}),
	}),
});

export const {
	useFetchMessagesQuery,
	useSendMessageMutation,
	useJoinChatMutation,
	useLeaveChatMutation,
	useFetchOnlineQuery,
	useTypingMessageMutation,
	useStopTypingMutation,
	useFriendTypingQuery,
} = messengerPageApi;
