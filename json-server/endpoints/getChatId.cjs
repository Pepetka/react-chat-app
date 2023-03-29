const fs = require('fs');
const path = require('path');
const crypto = require('node:crypto');

const getChatId = (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { userId, friendId } = req.query;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, '..', 'db.json'), 'UTF-8'),
		);
		const { chats = [], 'chat-members': chatMembers = [] } = db;

		const obj = {};

		chatMembers.forEach((chat) => {
			if (chat.userId === userId || chat.userId === friendId) {
				obj[chat.chatId] = obj[chat.chatId] === false;
			}
		});

		let chatId = crypto.randomUUID();

		Object.entries(obj).forEach(([key, value]) => {
			if (value) {
				chatId = key;
			}
		});

		return res.json(chatId);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
};

module.exports = getChatId;
