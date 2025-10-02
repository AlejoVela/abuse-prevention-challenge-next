import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import FinishPurchase from '@/app/[locale]/purchase/finish-purchase/page';
import { useContactStore, actionsContactStore } from '@/services/store/useContactStore';

jest.mock('next/navigation');
jest.mock('react-i18next');
jest.mock('@/services/store/useContactStore');
jest.mock('@/components/header/Header', () => {
  return function MockHeader() {
    return <div data-testid="header">Header</div>;
  };
});
jest.mock('@/components/animated-checkmark/AnimatedCheckmark', () => {
  return function MockAnimatedCheckmark() {
    return <div data-testid="animated-checkmark">Checkmark</div>;
  };
});
jest.mock('@/components/button/MeliButton', () => {
  return function MockMeliButton({ onClick, text }: any) {
    return <button onClick={onClick} data-testid="meli-button">{text}</button>;
  };
});
jest.mock('next/image', () => {
  return function MockImage(props: any) {
    return <img {...props} data-testid="next-image" />;
  };
});

const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockT = jest.fn((key: string, options?: any) => {
  if (options) {
    return `${key}-${JSON.stringify(options)}`;
  }
  return key;
});
const mockGet = jest.fn();
const mockLoadContactData = jest.fn();

const mockContactData = {
  userId: 'test-user',
  fullname: 'John Doe',
  country: { id: 'US', name: 'United States' },
  address: '123 Main St'
};

describe('FinishPurchase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      replace: mockReplace
    });
    (useParams as jest.Mock).mockReturnValue({ locale: 'es-AR' });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: mockGet.mockImplementation((param) => {
        if (param === 'token') return 'valid-token';
        if (param === 'previous_step') return '/es-AR/purchase/update-contact-data';
        return null;
      })
    });
    (useTranslation as jest.Mock).mockReturnValue({ t: mockT });
    (useContactStore as unknown as jest.Mock).mockReturnValue(mockContactData);
    (actionsContactStore as any).loadContactData = mockLoadContactData;
  });

  it('should render page layout correctly', () => {
    render(<FinishPurchase />);
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('meli-button')).toBeInTheDocument();
  });

  it('should load contact data on mount', () => {
    render(<FinishPurchase />);
    
    expect(mockLoadContactData).toHaveBeenCalled();
  });

  it('should redirect if no captcha token', () => {
    mockGet.mockImplementation((param) => {
      if (param === 'token') return null;
      return null;
    });
    
    render(<FinishPurchase />);
    
    expect(mockReplace).toHaveBeenCalledWith(
      '/es-AR/purchase/update-contact-data?error=captcha_invalid'
    );
  });

  it('should display contact data correctly', () => {
    render(<FinishPurchase />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('123 Main St, United States')).toBeInTheDocument();
  });

  it('should handle confirm purchase button click', () => {
    render(<FinishPurchase />);
    
    const confirmButton = screen.getByTestId('meli-button');
    fireEvent.click(confirmButton);
    
    expect(screen.getByTestId('animated-checkmark')).toBeInTheDocument();
  });

  it('should navigate back when modify delivery is clicked', () => {
    render(<FinishPurchase />);
    
    const modifyDeliveryLink = screen.getByText('delivery.modify-delivery');
    fireEvent.click(modifyDeliveryLink);
    
    expect(mockPush).toHaveBeenCalledWith('/es-AR/purchase/update-contact-data');
  });

  it('should use previous step when available', () => {
    render(<FinishPurchase />);
    
    const modifyDeliveryLink = screen.getByText('delivery.modify-delivery');
    fireEvent.click(modifyDeliveryLink);
    
    expect(mockPush).toHaveBeenCalledWith('/es-AR/purchase/update-contact-data');
  });

  it('should use correct translation namespace', () => {
    render(<FinishPurchase />);
    
    expect(useTranslation).toHaveBeenCalledWith(['translation'], {
      keyPrefix: 'pages.finish-purchase'
    });
  });

  it('should display all required sections', () => {
    render(<FinishPurchase />);
    
    expect(mockT).toHaveBeenCalledWith('review.title');
    expect(mockT).toHaveBeenCalledWith('billing.title');
    expect(mockT).toHaveBeenCalledWith('delivery.title');
    expect(mockT).toHaveBeenCalledWith('payment.title');
    expect(mockT).toHaveBeenCalledWith('summary.title');
  });
});