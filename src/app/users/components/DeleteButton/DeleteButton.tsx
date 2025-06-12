import { useState } from 'react'
import { deleteUser } from '@/services/users'
import { useQueryClient } from '@tanstack/react-query'
import styles from './deleteButton.module.css'

export function DeleteButton({ userId }: { userId: string }) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const queryClient = useQueryClient()

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      await deleteUser(userId)
      await queryClient.invalidateQueries({ queryKey: ['users'] })
    } catch (err) {
      alert((err as Error).message)
    } finally {
      setIsDeleting(false)
      setShowConfirm(false)
    }
  }

  return (
    <>
      <button className={styles.deleteButton} onClick={() => setShowConfirm(true)}>
        Deletar
      </button>

      {showConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>Tem certeza que deseja deletar este usuário?</p>
            <div className={styles.modalActions}>
              <button onClick={handleDelete} disabled={isDeleting} className={styles.confirmButton}>
                {isDeleting ? 'Deletando...' : 'Confirmar'}
              </button>
              <button onClick={() => setShowConfirm(false)} disabled={isDeleting} className={styles.cancelButton}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}