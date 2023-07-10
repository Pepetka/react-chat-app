import { io, Socket } from 'socket.io-client';
import { LOCAL_STORAGE_AUTH_KEY } from '@/shared/const/localstorage';

let socket: Socket;

export const getSocket = () => {
	const token = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
	let options: Parameters<typeof io>[1];

	if (token) {
		options = {
			auth: { token },
		};
	}

	if (!socket) {
		socket = io('ws://192.168.31.58:8000', options);
	}

	return socket;
};
