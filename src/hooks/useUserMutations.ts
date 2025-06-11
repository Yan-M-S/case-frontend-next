import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUser, updateUser, User } from '@/services/users'

export function useCreateUser() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: (data: User) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      router.push('/users')
    }
  })
}

export function useUpdateUser(userId: string) {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: (data: User) => updateUser(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['user', userId] })
      router.push('/users')
    }
  })
}