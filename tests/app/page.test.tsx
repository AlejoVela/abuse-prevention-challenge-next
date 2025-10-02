import { render } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import HomePage from '@/app/page';

jest.mock('next/navigation');

const mockReplace = jest.fn();

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace
    });
  });

  it('should redirect to purchase/update-contact-data on mount', () => {
    render(<HomePage />);
    
    expect(mockReplace).toHaveBeenCalledWith('/purchase/update-contact-data');
  });

  it('should render loading text', () => {
    const { container } = render(<HomePage />);
    
    expect(container.textContent).toBe('Loading...');
  });
});