import styles from './Loading.module.css'

export function Loading({ message = 'Processando...' }: { message?: string }) {
  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.loadingContent}>
        <div className={styles.loadingSpinner} />
        <p className={styles.loadingText}>{message}</p>
      </div>
    </div>
  )
}