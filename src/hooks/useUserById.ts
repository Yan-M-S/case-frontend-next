import { useQuery } from '@tanstack/react-query'
import { getUserById, User } from '@/services/users'

export function useUserById(userId: string | null) {
  return useQuery<User | undefined>({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId!),
    enabled: !!userId, 
  })
}