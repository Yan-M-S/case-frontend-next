import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UsersTable } from './UsersTable';
import { useUsers } from '@/hooks/useUsers'; 

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/hooks/useUsers');

describe('UsersTable', () => {
  it('should render loading state', () => {
    (useUsers as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
      isFetching: false,
      error: null,
    });

    render(<UsersTable />);
    expect(screen.getByText('🔄 Carregando usuários...')).toBeInTheDocument();
  });

  it('should render error state', () => {
    (useUsers as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isFetching: false,
      error: new Error('Erro ao carregar usuários'),
    });

    render(<UsersTable />);
    expect(screen.getByText('❌ Erro ao carregar usuários.')).toBeInTheDocument();
  });

  it('should render empty state', () => {
    (useUsers as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isFetching: false,
      error: null,
    });

    render(<UsersTable />);
    expect(screen.getByText('⚠️ Nenhum usuário encontrado.')).toBeInTheDocument();
  });

  it('should render users list', () => {
    const users = [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Doe', email: 'jane@example.com' },
    ];

    (useUsers as jest.Mock).mockReturnValue({
      data: users,
      isLoading: false,
      isFetching: false,
      error: null,
    });

    render(<UsersTable />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

});
