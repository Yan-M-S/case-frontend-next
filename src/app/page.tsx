import Link from 'next/link'
import styles from './page.module.css';


export default function HomePage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Sistema de Usuários</h1>
      <p className={styles.description}>Bem-vindo! Escolha uma opção para continuar:</p>

      <div className={styles.actions}>
        <Link href="/users">
          <button className={styles.button}>👉 Ver lista de usuários</button>
        </Link>

        <Link href="/users/create">
          <button className={styles.button}>👉 Criaçao de usuários</button>
        </Link>
      </div>
    </main>
  )
}