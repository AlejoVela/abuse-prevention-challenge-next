import { MeliCountriesService } from '@/services/api/MeliCountries.service';
import { apiCall } from '@/services/api/base';
import type { Country } from '@/services/api/types';

jest.mock('@/services/api/base');

const mockedApiCall = apiCall as jest.MockedFunction<typeof apiCall>;

describe('MeliCountriesService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCountries', () => {
    it('should fetch countries successfully', async () => {
      const mockCountries: Country[] = [
        { id: 'AR', name: 'Argentina' },
        { id: 'BR', name: 'Brazil' }
      ];

      mockedApiCall.mockResolvedValue(mockCountries);

      const service = MeliCountriesService();
      const result = await service.getCountries();

      expect(mockedApiCall).toHaveBeenCalledWith('/api/countries');
      expect(result).toEqual(mockCountries);
    });

    it('should handle fetch countries error', async () => {
      mockedApiCall.mockRejectedValue(new Error('Network error'));

      const service = MeliCountriesService();

      await expect(service.getCountries()).rejects.toThrow('Failed to fetch countries');
    });
  });

  describe('searchCountries', () => {
    it('should search countries successfully', async () => {
      const mockCountries: Country[] = [
        { id: 'AR', name: 'Argentina' }
      ];

      mockedApiCall.mockResolvedValue(mockCountries);

      const service = MeliCountriesService();
      const result = await service.searchCountries('Argentina');

      expect(mockedApiCall).toHaveBeenCalledWith('/api/countries/match/Argentina');
      expect(result).toEqual(mockCountries);
    });

    it('should encode search query in URL', async () => {
      mockedApiCall.mockResolvedValue([]);

      const service = MeliCountriesService();
      await service.searchCountries('United States');

      expect(mockedApiCall).toHaveBeenCalledWith('/api/countries/match/United%20States');
    });

    it('should trim search query', async () => {
      mockedApiCall.mockResolvedValue([]);

      const service = MeliCountriesService();
      await service.searchCountries('  Argentina  ');

      expect(mockedApiCall).toHaveBeenCalledWith('/api/countries/match/Argentina');
    });

    it('should throw error for empty query', async () => {
      const service = MeliCountriesService();

      await expect(service.searchCountries('')).rejects.toThrow('Search query cannot be empty');
      await expect(service.searchCountries('   ')).rejects.toThrow('Search query cannot be empty');
    });

    it('should handle search error', async () => {
      mockedApiCall.mockRejectedValue(new Error('Network error'));

      const service = MeliCountriesService();

      await expect(service.searchCountries('Argentina')).rejects.toThrow('Failed to search countries with query: Argentina');
    });
  });
});