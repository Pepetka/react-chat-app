import { profileApi } from '@/entities/Profile';

export const editProfileApi = profileApi;

export const { useEditProfileMutation, useFetchProfileDataQuery } =
	editProfileApi;
