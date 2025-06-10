'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { UserForm } from '../components/UserForm/UserForm'
import { getUserById, createUser, updateUser } from '@/services/users'
import { User } from '@/services/users'

export default function CreateUserPage() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const searchParams = useSearchParams()
  const userId = searchParams.get('id')

  const { data: user, isLoading: isUserLoading } = useQuery<User | undefined>({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId!),
    enabled: !!userId, 
  })

  const mutation = useMutation({
    mutationFn: async (formData: User) => {
      if (userId) {
        await updateUser(userId, formData)
      } else {
        await createUser(formData)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] }) 
      router.push('/users')
    }
  })

  return (
    <>
    <main style={{ padding: '2rem' }}>
      <h1>{userId ? 'Editar Usuário' : 'Criar Usuário'}</h1>

      <UserForm
        defaultValues={user}
        onSubmit={(formData) => mutation.mutateAsync(formData)}
        loading={mutation.isPending || isUserLoading}
      />
    </main>
    </>
  )
}
