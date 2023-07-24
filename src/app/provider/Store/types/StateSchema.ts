import {
	AnyAction,
	CombinedState,
	EnhancedStore,
	Reducer,
	ReducersMapObject,
} from '@reduxjs/toolkit';
import { rtkApi } from '@/shared/api/rtkApi';
import { UserSchema } from '@/entities/User';
import { PostSchema } from '@/entities/Post';
import { CommentSchema } from '@/entities/Comment';
import { FriendSchema } from '@/entities/Friend';
import { ChatSchema } from '@/entities/Chat';
import { MessageSchema } from '@/entities/Message';
import { GroupSchema } from '@/entities/Group';

export interface StateSchema {
	user: UserSchema;
	post?: PostSchema;
	comment?: CommentSchema;
	friend?: FriendSchema;
	chat?: ChatSchema;
	message?: MessageSchema;
	group?: GroupSchema;
	[rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<StateSchema>;
	reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
	add: (key: StateSchemaKey, reducer: Reducer) => void;
	remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
	reducerManager: ReducerManager;
}
