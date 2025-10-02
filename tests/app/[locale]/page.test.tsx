import { render } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import HomePage from '@/app/[locale]/page';

jest.mock('next/navigation');

const mockReplace = jest.fn();

describe('LocaleHomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace
    });
  });

  it('should redirect to locale-specific purchase page', async () => {
    const mockParams = Promise.resolve({ locale: 'es-AR' });
    
    render(<HomePage params={mockParams} />);
    
    await new Promise(resolve => setTimeout(resolve, 0));
    
    expect(mockReplace).toHaveBeenCalledWith('/es-AR/purchase/update-contact-data');
  });

  it('should handle different locales', async () => {
    const mockParams = Promise.resolve({ locale: 'en-US' });
    
    render(<HomePage params={mockParams} />);
    
    await new Promise(resolve => setTimeout(resolve, 0));
    
    expect(mockReplace).toHaveBeenCalledWith('/en-US/purchase/update-contact-data');
  });

  it('should render null', () => {
    const mockParams = Promise.resolve({ locale: 'es-AR' });
    const { container } = render(<HomePage params={mockParams} />);
    
    expect(container.firstChild).toBeNull();
  });
});