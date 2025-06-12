'use client'

import { useUsers } from '@/hooks/useUsers'
import styles from './usersTable.module.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { deleteUser } from '@/services/users'

export function UsersTable() {
  const { data: users, isLoading, isFetching, error, refetch } = useUsers()
  const router = useRouter()
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleEdit = (userId: string) => {
    router.push(`/users/create/${userId}`)
  }

  const handleDelete = async (userId: string) => {
    setIsDeleting(true)
    try {
      await deleteUser(userId)
      await refetch()
    } catch (err) {
      console.error('Erro ao deletar usuário:', err)
    } finally {
      setIsDeleting(false)
      setConfirmDeleteId(null)
    }
  }

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
                  <button className={styles.button} onClick={() => handleEdit(user.id)}>
                    Editar
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => setConfirmDeleteId(user.id)}
                  >
                    Deletar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {confirmDeleteId && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>Tem certeza que deseja deletar este usuário?</p>
            <div className={styles.modalActions}>
              <button
                className={styles.confirmButton}
                onClick={() => handleDelete(confirmDeleteId)}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deletando...' : 'Confirmar'}
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setConfirmDeleteId(null)}
                disabled={isDeleting}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
