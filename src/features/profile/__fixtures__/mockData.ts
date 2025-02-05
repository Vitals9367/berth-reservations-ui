import { Language } from '../../../__generated__/globalTypes';
import { ProfilePageProps } from '../ProfilePage';

export const mockContactInfo: ProfilePageProps['contactInfo'] = {
  firstName: 'Kalle',
  lastName: 'Kallela',
  address: 'Kallenkatu 6',
  zipCode: '00100',
  municipality: 'Helsinki',
  phoneNumber: '-',
  email: 'kalle@gmail.com',
  customerGroup: 'Yksityinen',
  language: Language.FINNISH,
  primaryAddressId: 'MOCK-ADDRESS',
  primaryEmailId: 'MOCK-EMAIL',
  primaryPhoneId: 'MOCK-PHONE',
};

// Simplified based on mockData for berths
export const mockHasBerthNotifications = (id: string): boolean => {
  switch (id) {
    case '1':
      return false;
    case '2':
      return true;
    case '3':
      return true;
    case '4':
      return false;
    default:
      return false;
  }
};
