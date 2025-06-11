'use client'

import { use } from 'react'
import { useQuery } from '@tanstack/react-query'
import { UserForm } from '../../components/UserForm/UserForm'
import { getUserById, User } from '@/services/users'
import { useCreateUser, useUpdateUser } from '../../../../hooks/useUserMutations'
import { Loading } from '../../components/ui/Loading'
import { useUserById } from '@/hooks/useUserById'

interface CreateUserPageProps {
  params: Promise<{ id?: string[] }>
}

export default function CreateUserPage(props: CreateUserPageProps) {
  const { id } = use(props.params) 
  const userId = id?.[0] || null

const { data: user, isLoading: isUserLoading } = useUserById(userId)

  const createUserMutation = useCreateUser()
  const updateUserMutation = useUpdateUser(userId ?? '')

  const handleSubmit = async (formData: User) => {
    if (userId) {
      await updateUserMutation.mutateAsync(formData)
    } else {
      await createUserMutation.mutateAsync(formData)
    }
  }

  const isLoading = createUserMutation.isPending || updateUserMutation.isPending || isUserLoading

  return (
    <main>
      <h1>{userId ? 'Editar Usuário' : 'Criar Usuário'}</h1>
      {userId && !user ? (
      <Loading message="Carregando usuário..." />
      ) : (
      <UserForm
        defaultValues={user}
        onSubmit={handleSubmit}
        loading={isLoading}
      />
    )}
    </main>
  )
}
