import { render, screen, fireEvent } from '@testing-library/react';
import MeliButton from '@/components/button/MeliButton';

describe('MeliButton', () => {
  it('should render with primary variant by default', () => {
    render(<MeliButton text="Test Button" />);
    
    const button = screen.getByRole('button', { name: 'Test Button' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('meli-button');
    expect(button).toHaveClass('meli-button--primary');
  });

  it('should render with secondary variant', () => {
    render(<MeliButton text="Secondary Button" variant="secondary" />);
    
    const button = screen.getByRole('button', { name: 'Secondary Button' });
    expect(button).toHaveClass('meli-button--secondary');
  });

  it('should call onClick when clicked', () => {
    const mockOnClick = jest.fn();
    render(<MeliButton text="Clickable Button" onClick={mockOnClick} />);
    
    const button = screen.getByRole('button', { name: 'Clickable Button' });
    fireEvent.click(button);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should display correct text', () => {
    const buttonText = 'Custom Button Text';
    render(<MeliButton text={buttonText} />);
    
    expect(screen.getByText(buttonText)).toBeInTheDocument();
  });

  it('should have button type', () => {
    render(<MeliButton text="Test Button" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });
});