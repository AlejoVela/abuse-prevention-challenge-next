import { renderHook, act } from '@testing-library/react';
import { useContactFormValidation } from '@/hooks/useContactFormValidation';
import { useTranslation } from 'react-i18next';
import type { ContactData } from '@/services/api/types';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

const mockT = jest.fn((key: string) => {
  const translations: Record<string, string> = {
    'fullname.required': 'Full name is required',
    'fullname.min': 'Full name must be at least 2 characters',
    'fullname.max': 'Full name cannot exceed 100 characters',
    'country.required': 'Country is required',
    'address.required': 'Address is required',
    'address.min': 'Address must be at least 5 characters',
    'address.max': 'Address cannot exceed 200 characters',
    'captcha.required': 'Please complete the captcha',
    'captcha.error': 'Captcha error',
    'general.validation-error': 'Validation error',
  };
  return translations[key] || key;
});

describe('useContactFormValidation', () => {
  beforeEach(() => {
    (useTranslation as jest.Mock).mockReturnValue({ t: mockT });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useContactFormValidation());

    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.validationErrors).toEqual({});
    expect(result.current.captchaToken).toBeNull();
  });

  it('should validate required fields', () => {
    const { result } = renderHook(() => useContactFormValidation());

    const invalidContactData: ContactData = {
      userId: '123',
      fullname: '',
      country: { id: '', name: '' },
      address: '',
    };

    const validation = result.current.validateForm(invalidContactData, null);

    expect(validation.success).toBe(false);
    expect(validation.errors).toHaveProperty('fullname');
    expect(validation.errors).toHaveProperty('country');
    expect(validation.errors).toHaveProperty('address');
    expect(validation.errors).toHaveProperty('captcha');
  });

  it('should validate fullname length constraints', () => {
    const { result } = renderHook(() => useContactFormValidation());

    const shortNameData: ContactData = {
      userId: '123',
      fullname: 'A',
      country: { id: 'US', name: 'United States' },
      address: 'Valid address',
    };

    const validation = result.current.validateForm(shortNameData, 'valid-token');

    expect(validation.success).toBe(false);
    expect(validation.errors?.fullname).toBe('Full name must be at least 2 characters');
  });

  it('should validate address length constraints', () => {
    const { result } = renderHook(() => useContactFormValidation());

    const shortAddressData: ContactData = {
      userId: '123',
      fullname: 'John Doe',
      country: { id: 'US', name: 'United States' },
      address: '123',
    };

    const validation = result.current.validateForm(shortAddressData, 'valid-token');

    expect(validation.success).toBe(false);
    expect(validation.errors?.address).toBe('Address must be at least 5 characters');
  });

  it('should pass validation with valid data', () => {
    const { result } = renderHook(() => useContactFormValidation());

    const validContactData: ContactData = {
      userId: '123',
      fullname: 'John Doe',
      country: { id: 'US', name: 'United States' },
      address: '123 Main Street',
    };

    const validation = result.current.validateForm(validContactData, 'valid-captcha-token');

    expect(validation.success).toBe(true);
    expect(validation.errors).toBeNull();
    expect(validation.data).toEqual({
      fullname: 'John Doe',
      country: { id: 'US', name: 'United States' },
      address: '123 Main Street',
      captcha: 'valid-captcha-token',
    });
  });

  it('should clear specific error', () => {
    const { result } = renderHook(() => useContactFormValidation());

    act(() => {
      result.current.setMultipleErrors({
        fullname: 'Error',
        address: 'Another error',
      });
    });

    expect(result.current.validationErrors.fullname).toBe('Error');
    expect(result.current.validationErrors.address).toBe('Another error');

    act(() => {
      result.current.clearError('fullname');
    });

    expect(result.current.validationErrors.fullname).toBeUndefined();
    expect(result.current.validationErrors.address).toBe('Another error');
  });

  it('should clear all errors', () => {
    const { result } = renderHook(() => useContactFormValidation());

    act(() => {
      result.current.setMultipleErrors({
        fullname: 'Error',
        address: 'Another error',
      });
    });

    expect(Object.keys(result.current.validationErrors)).toHaveLength(2);

    act(() => {
      result.current.clearAllErrors();
    });

    expect(result.current.validationErrors).toEqual({});
  });

  it('should handle captcha token change', () => {
    const { result } = renderHook(() => useContactFormValidation());

    act(() => {
      result.current.handleCaptchaChange('new-token');
    });

    expect(result.current.captchaToken).toBe('new-token');
  });

  it('should clear captcha error when token is provided', () => {
    const { result } = renderHook(() => useContactFormValidation());

    act(() => {
      result.current.setMultipleErrors({ captcha: 'Captcha error' });
    });

    expect(result.current.validationErrors.captcha).toBe('Captcha error');

    act(() => {
      result.current.handleCaptchaChange('valid-token');
    });

    expect(result.current.validationErrors.captcha).toBeUndefined();
  });

  it('should handle captcha error', () => {
    const { result } = renderHook(() => useContactFormValidation());

    act(() => {
      result.current.setCaptchaToken('some-token');
    });

    expect(result.current.captchaToken).toBe('some-token');

    act(() => {
      result.current.handleCaptchaError();
    });

    expect(result.current.captchaToken).toBeNull();
    expect(result.current.validationErrors.captcha).toBe('Captcha error');
  });

  it('should set general error', () => {
    const { result } = renderHook(() => useContactFormValidation());

    act(() => {
      result.current.setGeneralError('General error message');
    });

    expect(result.current.validationErrors.general).toBe('General error message');
  });

  it('should update isSubmitting state', () => {
    const { result } = renderHook(() => useContactFormValidation());

    expect(result.current.isSubmitting).toBe(false);

    act(() => {
      result.current.setIsSubmitting(true);
    });

    expect(result.current.isSubmitting).toBe(true);
  });
});