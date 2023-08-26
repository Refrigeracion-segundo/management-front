export interface IClientRegister {
  name: string;
  contactPerson: string;
  phone: string;
  rfc: string;
  street: string;
  streetNumber: string;
  apartmentNumber: string;
  zipCode: string;
  state?: { id: number; name: string };
  city?: { id: number; name: string };
  suburb: string;
  fiscalRegime: string;
}
