class SocketMock {
	#mockOn: Record<string, any> = {};
	#mockEmit: Record<string, any> = {};
	#error: Record<string, boolean> = {};

	#clientOn = (ev: string, listener: (data: any) => void): any => {
		if (this.#error[ev]) throw new Error('Mock Socket Error');
		if (!this.#mockOn[ev]) return;
		listener(this.#mockOn[ev]);
	};

	#clientEmit = (
		ev: string,
		args: any,
		listener?: (data: any) => void,
	): any => {
		this.#mockEmit[ev] = args;
		listener?.(this.#mockEmit[ev]);
	};

	#clientOff = (ev: string) => {};

	#serverOn = (ev: string, listener: (data: any) => void) => {
		listener(this.#mockEmit[ev]);
	};

	#serverEmit = (ev: string, args: any, error = false) => {
		this.#error[ev] = error;
		this.#mockOn[ev] = args;
	};

	resetMockSocket = () => {
		this.#mockOn = {};
		this.#mockEmit = {};
		this.#error = {};
	};

	mockClientSocket: {
		on: (ev: string, listener: (data: any) => void) => void;
		emit: (ev: string, args?: any, listener?: (data: any) => void) => void;
		off: (ev: string) => void;
		connect: () => void;
		disconnect: () => void;
	} = {
		on: this.#clientOn,
		emit: this.#clientEmit,
		off: this.#clientOff,
		connect: () => {},
		disconnect: () => {},
	};

	mockServerSocket: {
		on: (ev: string, listener: (data: any) => void) => void;
		emit: (ev: string, args: any, error?: boolean) => void;
	} = {
		on: this.#serverOn,
		emit: this.#serverEmit,
	};
}

export const { mockClientSocket, mockServerSocket, resetMockSocket } =
	new SocketMock();
