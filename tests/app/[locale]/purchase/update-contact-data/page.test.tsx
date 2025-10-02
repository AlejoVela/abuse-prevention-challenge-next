import { render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import UpdateContactDataPage from '@/app/[locale]/purchase/update-contact-data/page';

jest.mock('react-i18next');
jest.mock('@/components/header/Header', () => {
  return function MockHeader() {
    return <div data-testid="header">Header</div>;
  };
});
jest.mock('@/app/[locale]/purchase/update-contact-data/form/ContactForm', () => {
  return function MockContactForm() {
    return <div data-testid="contact-form">Contact Form</div>;
  };
});

const mockT = jest.fn((key: string) => key);

describe('UpdateContactDataPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslation as jest.Mock).mockReturnValue({ t: mockT });
  });

  it('should render page layout correctly', () => {
    render(<UpdateContactDataPage />);
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('contact-form')).toBeInTheDocument();
  });

  it('should display info texts with correct translations', () => {
    render(<UpdateContactDataPage />);
    
    expect(mockT).toHaveBeenCalledWith('info.title');
    expect(mockT).toHaveBeenCalledWith('info.sub-title');
  });

  it('should use correct translation namespace', () => {
    render(<UpdateContactDataPage />);
    
    expect(useTranslation).toHaveBeenCalledWith(['translation'], {
      keyPrefix: 'pages.update-contact-data'
    });
  });

  it('should have correct CSS classes', () => {
    const { container } = render(<UpdateContactDataPage />);
    
    expect(container.firstChild).toHaveClass('update-contact-data-page');
    expect(container.querySelector('.update-contact-data-page__info')).toBeInTheDocument();
  });
});