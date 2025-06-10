'use client'

import Link from 'next/link'
import styles from './page.module.css'
import { ReactQueryClientProvider } from '@/providers/ReactQueryClientProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ReactQueryClientProvider>
          <header>Sistema de Usuários</header>
        <Link href="/">
          <button className={styles.button}>👉 Início</button>
        </Link>
          <main>{children}</main>
        </ReactQueryClientProvider>
      </body>
    </html>
  )
}