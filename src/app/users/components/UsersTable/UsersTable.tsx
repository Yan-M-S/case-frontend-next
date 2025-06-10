'use client'

import { useUsers } from '@/hooks/useUsers'
import styles from './usersTable.module.css'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function UsersTable() {
  const { data: users, isLoading, error } = useUsers()
  const router = useRouter()

  if (isLoading) {
    return <p className={styles.loading}>🔄 Carregando usuários...</p>
  }

  if (error) {
    return <p className={styles.error}>❌ Erro ao carregar usuários.</p>
  }

  if (!users?.length) {
    return <p className={styles.empty}>⚠️ Nenhum usuário encontrado.</p>
  }

  const handleEdit = (userId: string) => {
    router.push(`/users/create?id=${userId}`)
  }

  // useEffect(() => { 
  //   console.log('Usuários carregados:', users)
  // },[users])

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button className={styles.button} onClick={() => handleEdit(user.id)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
