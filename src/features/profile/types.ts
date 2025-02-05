import { OrderStatus, Language, ApplicationStatus } from '../../__generated__/globalTypes';

export type ContactInfo = {
  address: string;
  customerGroup: string;
  email: string;
  firstName: string;
  language?: Language;
  lastName: string;
  municipality: string;
  phoneNumber: string;
  zipCode: string;
  primaryAddressId: string;
  primaryEmailId: string;
  primaryPhoneId: string;
};

export interface Choice<T extends Record<string, boolean>> {
  priority: number;
  id: string;
  name: string;
  availabilityLevel: {
    id: string;
    title: string;
    description: string | null;
  };
  properties: T;
}

export interface Area {
  address: string;
  image: string;
  map: string;
  name: string;
  website: string;
}

export interface Product {
  id: string;
  name: string; // TODO: Use real enum
  orderId: string;
  price: number;
}

export interface Order {
  dueDate: string;
  fixedProducts: Product[];
  fixedProductsTotalPrice: number;
  netPrice: number;
  optionalProducts: Product[];
  orderNumber: string;
  price: number;
  totalPrice: number;
  orderStatus: OrderStatus;
  vatAmount: number;
  vatPercentage: number;
}

export interface ApplicationData<T extends Record<string, boolean>> {
  id: string;
  applicationDate: string;
  choices: Choice<T>[];
  status: ApplicationStatus;
  boat: {
    id: string;
    name: string;
    registrationNumber: string;
  } | null;
}

export interface OfferData<PlaceSpecs> {
  area: Area;
  order: Order;
  placeSpecs: PlaceSpecs;
  seasonEndDate: string;
  seasonStartDate: string;
  properties: Record<string, boolean>;
}

export interface ContractData {
  issuedAt: string;
  editedAt: string;
  signedAt: string;
}

export interface InvoiceData<PlaceSpecs> {
  area: Area;
  properties: Record<string, boolean>;
  placeSpecs: PlaceSpecs;
  order: Order;
  seasonEndDate: string;
  seasonStartDate: string;
  contract: ContractData | null;
}
