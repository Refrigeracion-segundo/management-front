export interface ICountries {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
}

export interface ICities {
  id: number;
  name: string;
  state_id: number;
  state_code: string;
  country_id: number;
  country_code: string;
}

export interface IStates {
  id: number;
  name: string;
  country_id: number;
  country_code: string;
  state_code: string;
}

export interface IAddressResponse {
  items: Array<ICountries> | Array<ICities> | Array<IStates>;
  total: number;
  page: number;
}
