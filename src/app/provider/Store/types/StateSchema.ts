import { UserSchema } from '@/entities/User';
import { AuthByUsernameSchema } from '@/features/AuthByUsername';
import { rtkApi } from '@/shared/api/rtkApi';
import {
	AnyAction,
	CombinedState,
	EnhancedStore,
	Reducer,
	ReducersMapObject,
} from '@reduxjs/toolkit';
import { RegisterByUsernameSchema } from '@/features/RegisterByUsername';
import { PostSchema } from '@/entities/Post';
import { CommentSchema } from '@/entities/Comment';
import { FriendSchema } from '@/entities/Friend';

export interface StateSchema {
	user: UserSchema;
	post?: PostSchema;
	comment?: CommentSchema;
	authByUsername?: AuthByUsernameSchema;
	registerByUsername?: RegisterByUsernameSchema;
	friend?: FriendSchema;
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
