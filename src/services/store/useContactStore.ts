import { fallbackCountries } from "@/fallbacks/countries";
import type { SelectOption } from "@/types";
import { create } from "zustand";
import {
  MeliCountriesService,
  MeliUsersService,
  type ContactData,
  type Country,
} from "@services/api";

interface IContactStore {
  defaultUserId: string;
  countries: SelectOption[];
  contactData: ContactData;
}

const initialState: IContactStore = {
  defaultUserId: import.meta.env.VITE_DEFAULT_USER_ID,
  countries: fallbackCountries,
  contactData: {
    userId: import.meta.env.VITE_DEFAULT_USER_ID,
    fullname: "",
    country: { id: "", name: "" },
    address: "",
  },
};
export const useContactStore = create<IContactStore>(() => ({
  ...initialState,
}));

export const actionsContactStore = {
  setUserId: (userId: string) =>
    useContactStore.setState({ defaultUserId: userId }),
  loadCountries: async () => {
    const { getCountries } = MeliCountriesService();
    try {
      const fetchedCountries = await getCountries();
      const countryOptions: SelectOption[] = fetchedCountries.map(
        (country: Country) => ({
          label: country.name,
          value: country.id,
        })
      );

      useContactStore.setState({ countries: countryOptions });
    } catch (error) {
      useContactStore.setState({ countries: fallbackCountries });
      console.error("Error loading countries:", error);
    }
  },
  loadContactData: async () => {
    const { getContactData } = MeliUsersService();

    try {
      const contactData = await getContactData(
        useContactStore.getState().defaultUserId
      );
      useContactStore.setState({ contactData });
    } catch (error) {
      console.error("Error loading contact data:", error);
    }
  },
  updateCountry: (country: SelectOption) => {
    const currentContactData = useContactStore.getState().contactData;
    useContactStore.setState({
      contactData: {
        ...currentContactData,
        country: { id: country.value, name: country.label },
      },
    });
  },
  updateContactData: async (contactData: ContactData) => {
    const { updateContactData } = MeliUsersService();
    const defaultUserId = useContactStore.getState().defaultUserId;
    try {
      await updateContactData(defaultUserId, {
        fullname: contactData.fullname,
        address: contactData.address,
        country: contactData.country,
      });
    } catch (error) {
      console.error("Error updating contact data:", error);
    }
  },
};
