'use client'

import { UsersTable } from './components/UsersTable/UsersTable'

export default function UsersPage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Lista de Usuários</h1>
      <UsersTable />
    </main>
  )
}