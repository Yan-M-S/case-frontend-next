'use client'

import { useUsers } from '@/hooks/useUsers'
import styles from './usersTable.module.css'
import { EditButton } from '../EditButton/EditButton'
import { DeleteButton } from '../DeleteButton/DeleteButton' 

export function UsersTable() {
  const { data: users, isLoading, isFetching, error } = useUsers()

  if (isLoading || isFetching) {
    return <p className={styles.loading}>🔄 Carregando usuários...</p>
  }

  if (error) {
    return <p className={styles.error}>❌ Erro ao carregar usuários.</p>
  }

  if (!users?.length) {
    return <p className={styles.empty}>⚠️ Nenhum usuário encontrado.</p>
  }

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
                <div className={styles.actions}>
                  <EditButton userId={user.id} />
                  <DeleteButton userId={user.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
