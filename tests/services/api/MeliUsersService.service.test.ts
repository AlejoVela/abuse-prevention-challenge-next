import { MeliUsersService } from '@/services/api/MeliUsersService.service';
import { apiCall } from '@/services/api/base';
import type { ContactData, UpdateContactDataRequest } from '@/services/api/types';

jest.mock('@/services/api/base');

const mockedApiCall = apiCall as jest.MockedFunction<typeof apiCall>;

describe('MeliUsersService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getContactData', () => {
    const mockContactData: ContactData = {
      userId: '123',
      fullname: 'John Doe',
      country: { id: 'US', name: 'United States' },
      address: '123 Main St'
    };

    it('should fetch contact data successfully', async () => {
      mockedApiCall.mockResolvedValue(mockContactData);

      const service = MeliUsersService();
      const result = await service.getContactData('123');

      expect(mockedApiCall).toHaveBeenCalledWith('/api/users/contact-data/123');
      expect(result).toEqual(mockContactData);
    });

    it('should encode user ID in URL', async () => {
      mockedApiCall.mockResolvedValue(mockContactData);

      const service = MeliUsersService();
      await service.getContactData('user@email.com');

      expect(mockedApiCall).toHaveBeenCalledWith('/api/users/contact-data/user%40email.com');
    });

    it('should throw error for empty user ID', async () => {
      const service = MeliUsersService();

      await expect(service.getContactData('')).rejects.toThrow('User ID cannot be empty');
      await expect(service.getContactData('   ')).rejects.toThrow('User ID cannot be empty');
    });

    it('should handle fetch error', async () => {
      mockedApiCall.mockRejectedValue(new Error('Network error'));

      const service = MeliUsersService();

      await expect(service.getContactData('123')).rejects.toThrow('Failed to fetch contact data for user: 123');
    });
  });

  describe('updateContactData', () => {
    const mockContactData: ContactData = {
      userId: '123',
      fullname: 'Jane Doe',
      country: { id: 'CA', name: 'Canada' },
      address: '456 Oak St'
    };

    const updateRequest: UpdateContactDataRequest = {
      fullname: 'Jane Doe',
      country: { id: 'CA', name: 'Canada' },
      address: '456 Oak St'
    };

    it('should update contact data successfully', async () => {
      mockedApiCall.mockResolvedValue(mockContactData);

      const service = MeliUsersService();
      const result = await service.updateContactData('123', updateRequest);

      expect(mockedApiCall).toHaveBeenCalledWith(
        '/api/users/contact-data/123',
        {
          method: 'PUT',
          body: JSON.stringify(updateRequest)
        }
      );
      expect(result).toEqual(mockContactData);
    });

    it('should encode user ID in URL for update', async () => {
      mockedApiCall.mockResolvedValue(mockContactData);

      const service = MeliUsersService();
      await service.updateContactData('user@email.com', updateRequest);

      expect(mockedApiCall).toHaveBeenCalledWith(
        '/api/users/contact-data/user%40email.com',
        {
          method: 'PUT',
          body: JSON.stringify(updateRequest)
        }
      );
    });

    it('should throw error for empty user ID', async () => {
      const service = MeliUsersService();

      await expect(service.updateContactData('', updateRequest)).rejects.toThrow('User ID cannot be empty');
      await expect(service.updateContactData('   ', updateRequest)).rejects.toThrow('User ID cannot be empty');
    });

    it('should throw error for empty contact data', async () => {
      const service = MeliUsersService();

      await expect(service.updateContactData('123', {})).rejects.toThrow('Contact data cannot be empty');
    });

    it('should handle update error', async () => {
      mockedApiCall.mockRejectedValue(new Error('Network error'));

      const service = MeliUsersService();

      await expect(service.updateContactData('123', updateRequest)).rejects.toThrow('Failed to update contact data for user: 123');
    });
  });
});