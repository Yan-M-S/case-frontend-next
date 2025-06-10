import { api } from "./api";

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'manager';
  createdAt: string;
};

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>('/users');
  return response.data;
};


export const getUserById = async (id: string): Promise<User | undefined> => {
  const response = await api.get<User>(`/users/${id}`);
  return response.data;
};


export const createUser = async (
  user: Omit<User, 'id' | 'createdAt'>
): Promise<User> => {
  const response = await api.post<User>('/users', user);
  return response.data;
};


export const updateUser = async (
  id: string,
  user: Omit<User, 'id' | 'createdAt'>
): Promise<User | undefined> => {
  const response = await api.put<User>(`/users/${id}`, user);
  return response.data;
};


export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};
