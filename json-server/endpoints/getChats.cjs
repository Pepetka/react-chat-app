const fs = require('fs');
const path = require('path');
const getContains = require('../helpers/getContains.cjs');
const sortByDate = require('../helpers/sortByDate.cjs');

const searchFilter = (search) => (el) => {
	return getContains(`${el.user.firstname} ${el.user.lastname}`, search);
};

const getUsers = (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { userId, search = '' } = req.query;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, '..', 'db.json'), 'UTF-8'),
		);
		const { users = [], messages = [], 'chat-members': chatMembers = [] } = db;

		const response = chatMembers
			.filter((chat) => {
				return chat.userId === userId;
			})
			.map((currentChat) => {
				const chatId = currentChat.chatId;

				const friendChat = chatMembers.find((chat) => {
					return chat.userId !== userId && chatId === chat.chatId;
				});

				const user = users.find((user) => {
					return user.id === friendChat.userId;
				});

				const lastMessageFromDB = messages
					.filter((message) => {
						return message.chatId === chatId;
					})
					.sort(sortByDate)[0];

				return {
					id: chatId,
					user: {
						id: user.id,
						firstname: user.firstname,
						lastname: user.lastname,
						avatar: user.avatar,
					},
					createdAt: lastMessageFromDB.createdAt,
					lastMessage: lastMessageFromDB.text,
				};
			})
			.filter(searchFilter(search))
			.sort(sortByDate);

		return res.json(response);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
};

module.exports = getUsers;
