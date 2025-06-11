import { api } from "./api";

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

const mockUser: User[] =
[
  {
    "id": "1a2b3c4d-0001",
    "name": "Alice Santos",
    "email": "alice.santos@example.com",
    "createdAt": "2024-11-10T14:23:00Z"
  },
  {
    "id": "1a2b3c4d-0002",
    "name": "Bruno Lima",
    "email": "bruno.lima@example.com",
    "createdAt": "2024-12-01T09:45:00Z"
  },
  {
    "id": "1a2b3c4d-0003",
    "name": "Carla Mendes",
    "email": "carla.mendes@example.com",
    "createdAt": "2025-01-15T16:12:00Z"
  },
  {
    "id": "1a2b3c4d-0004",
    "name": "Daniel Souza",
    "email": "daniel.souza@example.com",
    "createdAt": "2025-02-05T08:30:00Z"
  },
  {
    "id": "1a2b3c4d-0005",
    "name": "Eduarda Ribeiro",
    "email": "eduarda.ribeiro@example.com",
    "createdAt": "2025-03-20T13:55:00Z"
  },
  {
    "id": "1a2b3c4d-0006",
    "name": "Felipe Costa",
    "email": "felipe.costa@example.com",
    "createdAt": "2025-04-02T11:10:00Z"
  },
  {
    "id": "1a2b3c4d-0007",
    "name": "Gabriela Alves",
    "email": "gabriela.alves@example.com",
    "createdAt": "2025-05-22T10:05:00Z"
  }
]

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

let users = [...mockUser]

export const getUsers = async (): Promise<User[]> => {
  await delay(1000)
  return [...users]
}

export const getUserById = async (id: string): Promise<User | undefined> => {
  await delay(1000)
  return users.find(u => u.id === id)
}

export const createUser = async (
  user: Omit<User, 'id' | 'createdAt'>
): Promise<User> => {
  await delay(1000)
  const newUser: User = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...user
  }
  users.push(newUser)
  return newUser
}

export const updateUser = async (
  id: string,
  user: Omit<User, 'id' | 'createdAt'>
): Promise<User | undefined> => {
  await delay(1000)
  const index = users.findIndex(u => u.id === id)
  if (index === -1) return undefined
  users[index] = {
    ...users[index],
    ...user
  }
  return users[index]
}

export const deleteUser = async (id: string): Promise<void> => {
  await delay(1000)
  users = users.filter(u => u.id !== id)
}


// export const getUsers = async (): Promise<User[]> => {
//   const response = await api.get<User[]>('/users');
//   return response.data;
// };


// export const getUserById = async (id: string): Promise<User | undefined> => {
//   const response = await api.get<User>(`/users/${id}`);
//   return response.data;
// };


// export const createUser = async (
//   user: Omit<User, 'id' | 'createdAt'>
// ): Promise<User> => {
//   const response = await api.post<User>('/users', user);
//   return response.data;
// };


// export const updateUser = async (
//   id: string,
//   user: Omit<User, 'id' | 'createdAt'>
// ): Promise<User | undefined> => {
//   const response = await api.put<User>(`/users/${id}`, user);
//   return response.data;
// };


// export const deleteUser = async (id: string): Promise<void> => {
//   await api.delete(`/users/${id}`);
// };
