const fs = require('fs');
const path = require('path');
const sortByDate = require('../helpers/sortByDate.cjs');
const sortByTime = require('../helpers/sortByTime.cjs');
const getCurrentDate = require('../helpers/getCurrentDate.cjs');
const crypto = require('node:crypto');

const getMessages = (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { chatId, userId, friendId } = req.query;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, '..', 'db.json'), 'utf8'),
		);
		const {
			users = [],
			messages = [],
			'chat-members': chatMembers = [],
			chats = [],
		} = db;

		if (!chats.find((chat) => chat.id === chatId)) {
			const friend = users.find((user) => user.id === friendId);

			return res.json({
				friend: {
					id: friend.id,
					firstname: friend.firstname,
					lastname: friend.lastname,
					avatar: friend.avatar,
				},
			});
		}

		const friend = users.find((user) => {
			return friendId === user.id;
		});

		const user = users.find((user) => {
			return userId === user.id;
		});

		const messagesResponse = {};

		messages.forEach((message) => {
			if (message.chatId !== chatId) {
				return;
			}

			const array = message.createdAt.split(' ')[0].split(':');

			const time = array[0] + ':' + array[1];
			const date = message.createdAt.split(' ')[1];

			const currentData = {
				authorId: message.userId,
				name:
					user.id === message.userId
						? `${user.firstname} ${user.lastname}`
						: `${friend.firstname} ${friend.lastname}`,
				text: message.text,
				img: message.img,
				time,
			};

			if (messagesResponse[date]) {
				messagesResponse[date] = [...messagesResponse[date], currentData];
			} else {
				messagesResponse[date] = [currentData];
			}
		});

		Object.values(messagesResponse).forEach((value) => {
			value.sort((prev, current) => sortByTime(prev.time, current.time, 'up'));
		});

		const response = {
			friend: {
				id: friend.id,
				firstname: friend.firstname,
				lastname: friend.lastname,
				avatar: friend.avatar,
			},
			messages: Object.entries(messagesResponse).sort((prev, current) =>
				sortByDate(prev[0], current[0], 'up'),
			),
		};

		return res.json(response);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
};

const postMessages = (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { chatId, userId, friendId, text } = req.body;
		const img = req.body?.img;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, '..', 'db.json'), 'utf8'),
		);
		const {
			users = [],
			messages = [],
			chats = [],
			'chat-members': chatMembers = [],
		} = db;

		const messageId = crypto.randomUUID();

		const newMessage = {
			id: messageId,
			chatId,
			userId,
			type: 'text',
			text: text || undefined,
			img,
			createdAt: getCurrentDate(true),
		};

		let newDbObject = {
			...db,
			messages: [...messages, newMessage],
		};

		if (!chats.find((chat) => chat.id === chatId)) {
			const friend = users.find((user) => user.id === userId);

			newDbObject = {
				...newDbObject,
				chats: [
					...chats,
					{
						id: chatId,
						name: `${friend.firstname} ${friend.lastname}`,
						createdAt: getCurrentDate(true),
						ownerId: userId,
					},
				],
				'chat-members': [
					...chatMembers,
					{ userId: userId, chatId, createdAt: getCurrentDate() },
					{ userId: friendId, chatId, createdAt: getCurrentDate() },
				],
			};
		}

		const newDb = JSON.stringify(newDbObject);
		fs.writeFileSync(path.resolve(__dirname, '..', 'db.json'), newDb);

		return res.json(messageId);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
};

module.exports = {
	getMessages,
	postMessages,
};
