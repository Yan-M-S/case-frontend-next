import { useRouter } from 'next/navigation'
import styles from './usersTable.module.css'

export function EditButton({ userId }: { userId: string }) {
  const router = useRouter()

  return (
    <button
      className={styles.button}
      onClick={() => router.push(`/users/create/${userId}`)}
    >
      Editar
    </button>
  )
}