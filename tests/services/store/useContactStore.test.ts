import { useContactStore, actionsContactStore } from '@/services/store/useContactStore';
import { MeliCountriesService, MeliUsersService } from '@/services/api';
import { fallbackCountries } from '@/fallbacks/countries';
import type { ContactData, Country } from '@/services/api/types';
import type { SelectOption } from '@/types';

jest.mock('@/services/api');
jest.mock('@/fallbacks/countries', () => ({
  fallbackCountries: [
    { label: 'Fallback Country', value: 'FB' }
  ]
}));

const mockedMeliCountriesService = MeliCountriesService as jest.MockedFunction<typeof MeliCountriesService>;
const mockedMeliUsersService = MeliUsersService as jest.MockedFunction<typeof MeliUsersService>;

describe('useContactStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useContactStore.setState({
      defaultUserId: 'test-user-id',
      countries: fallbackCountries,
      contactData: {
        userId: 'test-user-id',
        fullname: '',
        country: { id: '', name: '' },
        address: '',
      },
    });
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = useContactStore.getState();
      
      expect(state.defaultUserId).toBe('test-user-id');
      expect(state.countries).toEqual(fallbackCountries);
      expect(state.contactData).toEqual({
        userId: 'test-user-id',
        fullname: '',
        country: { id: '', name: '' },
        address: '',
      });
    });
  });

  describe('actionsContactStore', () => {
    describe('setUserId', () => {
      it('should update user ID', () => {
        actionsContactStore.setUserId('new-user-id');
        
        const state = useContactStore.getState();
        expect(state.defaultUserId).toBe('new-user-id');
      });
    });

    describe('loadCountries', () => {
      it('should load countries successfully', async () => {
        const mockCountries: Country[] = [
          { id: 'AR', name: 'Argentina' },
          { id: 'BR', name: 'Brazil' }
        ];

        const mockService = {
          getCountries: jest.fn().mockResolvedValue(mockCountries),
          searchCountries: jest.fn()
        };
        mockedMeliCountriesService.mockReturnValue(mockService);

        await actionsContactStore.loadCountries();

        const state = useContactStore.getState();
        expect(state.countries).toEqual([
          { label: 'Argentina', value: 'AR' },
          { label: 'Brazil', value: 'BR' }
        ]);
        expect(mockService.getCountries).toHaveBeenCalled();
      });

      it('should use fallback countries on error', async () => {
        const mockService = {
          getCountries: jest.fn().mockRejectedValue(new Error('Network error')),
          searchCountries: jest.fn()
        };
        mockedMeliCountriesService.mockReturnValue(mockService);

        await actionsContactStore.loadCountries();

        const state = useContactStore.getState();
        expect(state.countries).toEqual(fallbackCountries);
      });
    });

    describe('loadContactData', () => {
      it('should load contact data successfully', async () => {
        const mockContactData: ContactData = {
          userId: 'test-user-id',
          fullname: 'John Doe',
          country: { id: 'US', name: 'United States' },
          address: '123 Main St'
        };

        const mockService = {
          getContactData: jest.fn().mockResolvedValue(mockContactData),
          updateContactData: jest.fn()
        };
        mockedMeliUsersService.mockReturnValue(mockService);

        await actionsContactStore.loadContactData();

        const state = useContactStore.getState();
        expect(state.contactData).toEqual(mockContactData);
        expect(mockService.getContactData).toHaveBeenCalledWith('test-user-id');
      });

      it('should handle load contact data error', async () => {
        const mockService = {
          getContactData: jest.fn().mockRejectedValue(new Error('Network error')),
          updateContactData: jest.fn()
        };
        mockedMeliUsersService.mockReturnValue(mockService);

        await actionsContactStore.loadContactData();

        const state = useContactStore.getState();
        expect(state.contactData.fullname).toBe('');
      });
    });

    describe('updateCountry', () => {
      it('should update selected country', () => {
        const countryOption: SelectOption = {
          label: 'United States',
          value: 'US'
        };

        actionsContactStore.updateCountry(countryOption);

        const state = useContactStore.getState();
        expect(state.contactData.country).toEqual({
          id: 'US',
          name: 'United States'
        });
      });

      it('should preserve other contact data when updating country', () => {
        useContactStore.setState({
          contactData: {
            userId: 'test-user-id',
            fullname: 'John Doe',
            country: { id: 'AR', name: 'Argentina' },
            address: '123 Street'
          }
        });

        const countryOption: SelectOption = {
          label: 'Brazil',
          value: 'BR'
        };

        actionsContactStore.updateCountry(countryOption);

        const state = useContactStore.getState();
        expect(state.contactData).toEqual({
          userId: 'test-user-id',
          fullname: 'John Doe',
          country: { id: 'BR', name: 'Brazil' },
          address: '123 Street'
        });
      });
    });

    describe('updateContactData', () => {
      it('should update contact data successfully', async () => {
        const updatedData: ContactData = {
          userId: 'test-user-id',
          fullname: 'Jane Doe',
          country: { id: 'CA', name: 'Canada' },
          address: '456 Oak St'
        };

        const mockService = {
          getContactData: jest.fn(),
          updateContactData: jest.fn().mockResolvedValue(updatedData)
        };
        mockedMeliUsersService.mockReturnValue(mockService);

        const result = await actionsContactStore.updateContactData(updatedData);

        expect(result).toEqual(updatedData);
        expect(mockService.updateContactData).toHaveBeenCalledWith('test-user-id', {
          fullname: 'Jane Doe',
          country: { id: 'CA', name: 'Canada' },
          address: '456 Oak St'
        });

        const state = useContactStore.getState();
        expect(state.contactData).toEqual(updatedData);
      });

      it('should throw error on update failure', async () => {
        const contactData: ContactData = {
          userId: 'test-user-id',
          fullname: 'John Doe',
          country: { id: 'US', name: 'United States' },
          address: '123 Main St'
        };

        const mockService = {
          getContactData: jest.fn(),
          updateContactData: jest.fn().mockRejectedValue(new Error('Update failed'))
        };
        mockedMeliUsersService.mockReturnValue(mockService);

        await expect(actionsContactStore.updateContactData(contactData)).rejects.toThrow('Update failed');
      });
    });
  });
});