import { rtkApi } from '@/shared/api/rtkApi';
import { Messages } from '@/entities/Message';
import { UserMini } from '@/shared/types/userCard';
import { getSocket } from '@/shared/api/socketApi';
import { socketError } from '@/shared/config/socket/socketError';

interface IMessengerApiProps {
	chatId: string;
	userId: string;
	friendId: string;
}

interface IMessengerListProps {
	page: number;
	limit?: number;
}

export const messengerApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchMessages: build.query<
			{
				messages: Messages;
				friend: UserMini;
				endReached: boolean;
				totalCount: number;
			},
			IMessengerApiProps & IMessengerListProps
		>({
			query: (params) => ({
				url: '/messages',
				params,
			}),
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

					socket.on('messages', (data: Messages[number]) => {
						updateCachedData((draft) => {
							const existedGroupIndex = draft.messages.findIndex(
								([existedDate]) => existedDate === data[0],
							);

							if (existedGroupIndex >= 0) {
								draft.messages[existedGroupIndex][1].push(...data[1]);
								draft.totalCount++;
							} else {
								draft.messages.push(data);
								draft.totalCount++;
							}
						});
					});

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
			void,
			IMessengerApiProps & {
				text?: string;
				files?: FileList;
			} & IMessengerListProps
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

				return { data: undefined };
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
	useLazyFetchMessagesQuery,
	useSendMessageMutation,
	useJoinChatMutation,
	useLeaveChatMutation,
	useFetchOnlineQuery,
	useTypingMessageMutation,
	useStopTypingMutation,
	useFriendTypingQuery,
} = messengerApi;
