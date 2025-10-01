export interface Country {
  id: string;
  name: string;
}

export interface ContactData {
  userId: string;
  fullname: string;
  country: Country;
  address: string;
}

export interface UpdateContactDataRequest {
  fullname?: string;
  address?: string;
  country?: Country;
}
