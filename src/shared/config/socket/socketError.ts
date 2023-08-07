interface ISocketError<T> {
	arg: T;
	requestId: string;
	error: Error;
	endpointName: string;
}

export const socketError = <T>({
	arg,
	requestId,
	error,
	endpointName,
}: ISocketError<T>) => {
	return {
		type: 'rtkApi/executeQuery/rejected',
		payload: { data: undefined },
		meta: {
			requestId,
			rejectedWithValue: Boolean(error),
			requestStatus: 'rejected',
			aborted: false,
			condition: false,
			arg: {
				type: 'query',
				subscribe: true,
				subscriptionOptions: { pollingInterval: 0 },
				endpointName,
				originalArgs: arg,
				queryCacheKey: `${endpointName}(${JSON.stringify(arg)})`,
			},
		},
		error: { message: 'Rejected' },
	};
};
