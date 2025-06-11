import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserForm } from './UserForm';

describe('UserForm', () => {
  const mockOnSubmit = jest.fn();

  it('should show updating message when isSubmitting is true', async () => {
    render(<UserForm onSubmit={mockOnSubmit} loading={false} />);

    fireEvent.change(screen.getByLabelText('Nome'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.click(screen.getByText('Enviar'));

    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });
});
