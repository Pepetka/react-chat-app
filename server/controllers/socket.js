import db from '../database/database.js';
import { UserMiniModel } from '../models/user.js';
import sortByDate from '../helpers/sortByDate.js';
import MessageModel from '../models/message.js';
import getCurrentDate from '../helpers/getCurrentDate.js';
import CommentModel from '../models/comment.js';
import sortByCreatedAt from '../helpers/sortByCreatedAt.js';

class Socket {
	#onlineUsers = new Set();

	#connectedUsers = {};

	get onlineUsers() {
		return Array.from(this.#onlineUsers);
	}

	set onlineUsers(userId) {
		this.#onlineUsers.add(userId);
	}

	removeOnlineUser(userId) {
		this.#onlineUsers.delete(userId);
	}

	get connectedUsers() {
		return this.#connectedUsers;
	}

	set connectedUsers(socket) {
		this.#connectedUsers[socket.id] = socket;
	}

	removeConnectedUser(socketId) {
		this.#connectedUsers[socketId] = undefined;
	}

	async getChatMessages(
		{ chatId, userId, friendId, page, limit },
		fullHostName,
	) {
		await db.read();
		const { users, messages, chats } = db.data;

		if (!chats.find((chat) => chat.id === chatId)) {
			const friend = users.find((user) => user.id === friendId);

			const friendMini = new UserMiniModel({
				id: friend.id,
				avatar: friend.avatar,
				name: `${friend.firstname} ${friend.lastname}`,
			});

			return {
				friend: friendMini,
				messages: [],
				endReached: false,
				totalCount: 0,
			};
		}

		const friend = users.find((user) => friendId === user.id);

		const user = users.find((user) => userId === user.id);

		const messagesResponse = {};

		const chatMessages = messages
			.filter((message) => message.chatId === chatId)
			.map((message) => {
				const array = message.createdAt.split(' ')[0].split(':');

				const time = `${array[0]}:${array[1]}`;
				const date = message.createdAt.split(' ')[1];

				const currentData = {
					id: message.id,
					authorId: message.userId,
					name:
						user.id === message.userId
							? `${user.firstname} ${user.lastname}`
							: `${friend.firstname} ${friend.lastname}`,
					text: message.text,
					img: message.img?.map((image) => `${fullHostName}/images/${image}`),
					time,
					date,
					createdAt: message.createdAt,
				};

				return currentData;
			})
			.sort((prev, current) => sortByCreatedAt(prev, current, 'up'));

		const endIndex = chatMessages.length;
		const startIndex = Math.max(
			endIndex - (Number(page) * Number(limit) + Number(limit)),
			0,
		);
		const endReached = startIndex === 0;

		chatMessages
			.slice(startIndex, endIndex)
			.forEach(({ date, ...currentData }) => {
				if (messagesResponse[date]) {
					messagesResponse[date] = [...messagesResponse[date], currentData];
				} else {
					messagesResponse[date] = [currentData];
				}
			});

		const chatFriend = new UserMiniModel({
			id: friend.id,
			avatar: `${fullHostName}/images/${friend.avatar}`,
			name: `${friend.firstname} ${friend.lastname}`,
		});

		const chatUser = new UserMiniModel({
			id: user.id,
			avatar: `${fullHostName}/images/${user.avatar}`,
			name: `${user.firstname} ${user.lastname}`,
		});

		const response = {
			chatMembers: {
				[chatFriend.id]: chatFriend,
				[chatUser.id]: chatUser,
			},
			messages: Object.entries(messagesResponse).sort((prev, current) =>
				sortByDate(prev[0], current[0], 'up'),
			),
		};

		return {
			friend: chatFriend,
			messages: response.messages,
			endReached,
			totalCount: endIndex,
		};
	}

	async postChatMessages(
		{ chatId, userId, friendId, text, img },
		fullHostName,
	) {
		await db.read();
		const { users, messages, chats, 'chat-members': chatMembers } = db.data;

		const newMessage = new MessageModel({
			chatId,
			userId,
			type: 'text',
			text,
			img,
		});

		messages.push(newMessage);

		if (!chats.find((chat) => chat.id === chatId)) {
			const friend = users.find((user) => user.id === userId);

			chats.push({
				id: chatId,
				name: `${friend.firstname} ${friend.lastname}`,
				createdAt: getCurrentDate(true),
				ownerId: userId,
			});

			chatMembers.push(
				{ userId, chatId, createdAt: getCurrentDate() },
				{ userId: friendId, chatId, createdAt: getCurrentDate() },
			);
		}

		await db.write();

		const user = users.find((user) => userId === user.id);

		const array = newMessage.createdAt.split(' ')[0].split(':');

		const time = `${array[0]}:${array[1]}`;
		const date = newMessage.createdAt.split(' ')[1];

		const currentData = {
			id: newMessage.id,
			authorId: newMessage.userId,
			name: `${user.firstname} ${user.lastname}`,
			text: newMessage.text,
			img: newMessage.img?.map((image) => `${fullHostName}/images/${image}`),
			time,
			createdAt: newMessage.createdAt,
		};

		return [date, [currentData]];
	}

	async getComments(postId, fullHostName) {
		await db.read();
		const { comments, users } = db.data;

		const commentsFromDb = comments
			.filter((comment) => comment.postId === String(postId))
			.map((comment) => {
				const author = users.find((user) => user.id === comment.authorId);
				const newAuthor = new UserMiniModel({
					id: author.id,
					avatar: `${fullHostName}/images/${author.avatar}`,
					name: `${author.firstname} ${author.lastname}`,
				});

				return {
					...comment,
					authorId: undefined,
					author: newAuthor,
				};
			})
			.sort((prev, current) => sortByDate(prev.createdAt, current.createdAt));

		return commentsFromDb;
	}

	async addComment({ authorId, text, postId }) {
		await db.read();
		const { comments } = db.data;

		const newComment = new CommentModel({
			text,
			authorId,
			postId,
		});

		comments.push(newComment);

		await db.write();

		return newComment;
	}

	async deleteComment(commentId) {
		await db.read();
		const { comments } = db.data;

		const deleteCommentIndex = comments.findIndex(
			(comment) => comment.id === commentId,
		);

		comments.splice(deleteCommentIndex, 1);

		await db.write();

		return comments[deleteCommentIndex];
	}
}

export default Socket;
