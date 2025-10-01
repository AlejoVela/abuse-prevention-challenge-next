import { apiCall } from "./base";
import type { Country } from "./types";

export const MeliCountriesService = () => {
  const baseCountriesEndpoint = "/api/countries";

  const getCountries = async (): Promise<Country[]> => {
    try {
      const response = await apiCall<Country[]>(
        baseCountriesEndpoint
      );
      return response;
    } catch (error) {
      console.error("Error fetching countries:", error);
      throw new Error("Failed to fetch countries");
    }
  };

  const searchCountries = async (query: string): Promise<Country[]> => {
    if (!query || query.trim().length === 0) {
      throw new Error("Search query cannot be empty");
    }

    try {
      const endpoint = `${baseCountriesEndpoint}/match/${encodeURIComponent(
        query.trim()
      )}`;
      const response = await apiCall<Country[]>(endpoint);
      return response;
    } catch (error) {
      console.error("Error searching countries:", error);
      throw new Error(`Failed to search countries with query: ${query}`);
    }
  };

  return {
    getCountries,
    searchCountries,
  };
};

export default MeliCountriesService;
