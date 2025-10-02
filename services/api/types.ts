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

export interface CaptchaValidationRequest {
  token: string;
}

export interface CaptchaValidationResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  score?: number;
  action?: string;
  error_codes?: string[];
}
