import axios from "axios";
import { api } from "./api";

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get<User[]>('/users')
    return response.data
  } catch (error) {
    throw new Error('Erro ao buscar usuários.')
  }
}

export const getUserById = async (id: string): Promise<User | undefined> => {
  try {
    const response = await api.get<User>(`/users/${id}`)
    return response.data
  } catch (error) {
    throw new Error('Erro ao buscar os dados do usuário.')
  }
}

export const createUser = async (
  user: Omit<User, 'id' | 'createdAt'>
): Promise<User> => {
  try {
    const response = await api.post<User>('/users', user)
    return response.data
  } catch (error) {
    throw new Error('Erro ao criar o usuário.')
  }
}

export const updateUser = async (
  id: string,
  user: Omit<User, 'id' | 'createdAt'>
): Promise<User | undefined> => {
  try {
    const response = await api.put<User>(`/users/${id}`, user)
    return response.data
  } catch (error) {
    throw new Error('Erro ao atualizar o usuário.')
  }
}

export const deleteUser = async (id: string): Promise<void> => {
  try {
    await api.delete(`/users/${id}`)
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message)
    }
    throw new Error('Erro ao deletar o usuário.')
  }
}
