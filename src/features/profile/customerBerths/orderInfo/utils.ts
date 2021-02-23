// TODO: Use real enum
import { StatusLabelProps } from 'hds-react';

import { OrderStatus } from '../../../../__generated__/globalTypes';

export const getProductServiceTKey = (productService: string) => {
  switch (productService) {
    case 'DINGHY_PLACE':
      return 'common.dinghy_place';
    case 'ELECTRICITY':
      return 'common.electricity';
    case 'GATE':
      return 'common.gate';
    case 'LIGHTING':
      return 'common.lighting';
    case 'MOORING':
      return 'common.mooring';
    case 'PARKING_PERMIT':
      return 'common.parking_permit';
    case 'STORAGE_ON_ICE':
      return 'common.storage_on_ice';
    case 'SUMMER_STORAGE_FOR_DOCKING_EQUIPMENT':
      return 'common.docking_equipment_summer_storage';
    case 'SUMMER_STORAGE_FOR_TRAILERS':
      return 'common.trailer_summer_storage';
    case 'WASTE_COLLECTION':
      return 'common.waste_collection';
    case 'WATER':
      return 'common.water';

    default:
      return productService;
  }
};

export const getStatusLabelKey = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.CANCELLED:
      return 'common.cancelled';
    case OrderStatus.ERROR:
      return 'common.error';
    case OrderStatus.EXPIRED:
      return 'common.expired';
    case OrderStatus.PAID:
      return 'common.paid';
    case OrderStatus.REJECTED:
      return 'common.rejected';
    case OrderStatus.WAITING:
      return 'common.waiting_for_payment';
    default:
      return status;
  }
};

export const getStatusLabelColor = (status: OrderStatus): StatusLabelProps['type'] => {
  switch (status) {
    case OrderStatus.CANCELLED:
      return 'error';
    case OrderStatus.ERROR:
      return 'error';
    case OrderStatus.EXPIRED:
      return 'error';
    case OrderStatus.PAID:
      return 'success';
    case OrderStatus.REJECTED:
      return 'error';
    case OrderStatus.WAITING:
      return 'alert';
    default:
      return 'neutral';
  }
};
