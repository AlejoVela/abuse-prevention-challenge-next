import { apiCall } from "./base";
import type { ContactData, UpdateContactDataRequest } from "./types";

export const MeliUsersService = () => {
  const baseUsersEndpoint = "/api/users";

  const getContactData = async (id: string): Promise<ContactData> => {
    if (!id || id.trim().length === 0) {
      throw new Error("User ID cannot be empty");
    }

    try {
      const endpoint = `${baseUsersEndpoint}/contact-data/${encodeURIComponent(
        id
      )}`;
      const response = await apiCall<ContactData>(endpoint);
      return response;
    } catch (error) {
      console.error(`Error fetching contact data for user ${id}:`, error);
      throw new Error(`Failed to fetch contact data for user: ${id}`);
    }
  };

  const updateContactData = async (
    id: string,
    contactData: UpdateContactDataRequest
  ): Promise<ContactData> => {
    if (!id || id.trim().length === 0) {
      throw new Error("User ID cannot be empty");
    }

    if (!contactData || Object.keys(contactData).length === 0) {
      throw new Error("Contact data cannot be empty");
    }

    try {
      const endpoint = `${baseUsersEndpoint}/contact-data/${encodeURIComponent(
        id
      )}`;
      const response = await apiCall<ContactData>(endpoint, {
        method: "PUT",
        body: JSON.stringify(contactData),
      });

      return response;
    } catch (error) {
      console.error(`Error updating contact data for user ${id}:`, error);
      throw new Error(`Failed to update contact data for user: ${id}`);
    }
  };

  return {
    getContactData,
    updateContactData,
  };
};

export default MeliUsersService;
