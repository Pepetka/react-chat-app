import { io, Socket } from 'socket.io-client';
import { LOCAL_STORAGE_AUTH_KEY } from '@/shared/const/localstorage';
import { mockClientSocket } from '@/shared/config/socket/socketMock';

let socket: Socket;

export const getSocket = () => {
	if (__MOCK_SOCKET__) return mockClientSocket;

	const token = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
	let options: Parameters<typeof io>[1];

	if (token) {
		options = {
			auth: { token },
		};
	}

	if (!socket) {
		socket = io(__API_SOCKET__, options);
	}

	return socket;
};
