import { useState } from 'react';
import * as React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { compose } from 'recompose';

import PaymentPage from './PaymentPage';
import ContractPage from './ContractPage';
import { CONFIRM_PAYMENT, FULFILL_CONTRACT, GET_ORDER_DETAILS } from '../../queries';
import { getOrderNumber, setOrderNumber } from '../../../common/utils/urls';
import { isOrderBerthOrWinter } from '../../../common/utils/orders';
import GeneralPaymentErrorPage from './paymentError/GeneralPaymentErrorPage';
import AlreadyPaidPage from './paymentError/AlreadyPaidPage';
import PastDueDatePage from './paymentError/PastDueDatePage';
import LoadingPage from '../../../common/loadingPage/LoadingPage';
import { LocalePush, withMatchParamsHandlers } from '../../../common/utils/container';
import { ConfirmPayment, ConfirmPaymentVariables } from '../../__generated__/ConfirmPayment';
import { OrderStatus, OrderTypeEnum } from '../../../__generated__/globalTypes';
import {
  OrderDetails,
  OrderDetails_contractAuthMethods as ContractAuthMethods,
  OrderDetailsVariables,
} from '../../__generated__/OrderDetails';
import { FulfillContract, FulfillContractVariables } from '../../__generated__/FulfillContract';
import BerthInfo from '../berthInfo/BerthInfo';
import WinterStorageInfo from '../winterStorageInfo/WinterStorageInfo';
import { TContext } from '../../../common/types/translation';

interface Props {
  localePush: LocalePush;
}

const PaymentPageContainer = ({ localePush }: Props) => {
  const orderNumber = getOrderNumber(window.location.search);

  const [isRedirecting, setIsRedirecting] = useState(false);

  const { loading: loadingOrderDetails, data: orderDetailsData, error: orderDetailsError } = useQuery<
    OrderDetails,
    OrderDetailsVariables
  >(GET_ORDER_DETAILS, {
    variables: {
      orderNumber: orderNumber as string,
    },
    skip: !orderNumber,
  });

  const [confirmPayment, { loading: loadingConfirmPayment, error: confirmError }] = useMutation<
    ConfirmPayment,
    ConfirmPaymentVariables
  >(CONFIRM_PAYMENT, {
    variables: {
      confirmPaymentMutationInput: {
        orderNumber: orderNumber as string,
      },
    },
    onCompleted: (confirmPaymentData: ConfirmPayment) => {
      setIsRedirecting(true);
      window.location.href = confirmPaymentData?.confirmPayment?.url as string;
    },
  });

  const [fulfillContract] = useMutation<FulfillContract, FulfillContractVariables>(FULFILL_CONTRACT);

  const handleSignContract = (authMethod: string) => {
    fulfillContract({
      variables: {
        fulfillContractMutationInput: {
          orderNumber: orderNumber as string,
          returnUrl: window.location.href,
          authService: authMethod,
        },
      },
    }).then((res) => {
      setIsRedirecting(true);
      window.location.href = res.data?.fulfillContract?.signingUrl as string;
    });
  };

  const handleTerminate = () => {
    localePush(setOrderNumber('cancel-order', orderNumber));
  };

  if (loadingOrderDetails || loadingConfirmPayment || isRedirecting) {
    return <LoadingPage disableNav />;
  }

  if (confirmError || orderDetailsError || typeof orderDetailsData?.contractSigned?.isSigned !== 'boolean') {
    return <GeneralPaymentErrorPage />;
  }

  return getPaymentPage(
    {
      area: orderDetailsData.orderDetails?.area,
      section: orderDetailsData.orderDetails?.section,
      place: orderDetailsData.orderDetails?.place,
    },
    orderDetailsData?.orderDetails?.orderType,
    orderNumber,
    orderDetailsData.contractSigned.isSigned,
    orderDetailsData?.orderDetails?.status,
    orderDetailsData?.contractAuthMethods ?? [],
    confirmPayment,
    handleSignContract,
    handleTerminate
  );
};

export const getPaymentPage = (
  placeDetails: {
    area: string | null | undefined;
    section: string | null | undefined;
    place: string | null | undefined;
  },
  orderType: OrderTypeEnum | undefined,
  orderNumber: string,
  contractSigned: boolean,
  status: OrderStatus | undefined | null,
  contractAuthMethods: ContractAuthMethods[],
  confirmPayment: () => void,
  signContract: (authMethod: string) => void,
  handleTerminate: () => void
): JSX.Element => {
  if (!status) {
    return <GeneralPaymentErrorPage />;
  }

  let orderProductDetails: React.ReactNode = null;
  let tContext: TContext = 'berth';

  if (isOrderBerthOrWinter(orderType) === 'berth') {
    orderProductDetails = (
      <BerthInfo harbor={placeDetails.area} pier={placeDetails.section} berth={placeDetails.place} />
    );
    tContext = 'berth';
  } else if (isOrderBerthOrWinter(orderType) === 'winter') {
    orderProductDetails = <WinterStorageInfo {...placeDetails} />;
    tContext = 'winter';
  }

  if (!contractSigned) {
    return (
      <ContractPage
        tContext={tContext}
        orderProductDetails={orderProductDetails}
        orderNumber={orderNumber}
        handleSign={signContract}
        handleTerminate={handleTerminate}
        contractAuthMethods={contractAuthMethods}
      />
    );
  }

  switch (status) {
    case OrderStatus.OFFERED:
      return <PaymentPage handlePay={confirmPayment} orderProductDetails={orderProductDetails} />;
    case OrderStatus.PAID:
      return <AlreadyPaidPage isAdditionalProduct={orderType === OrderTypeEnum.ADDITIONAL_PRODUCT} />;
    case OrderStatus.EXPIRED:
      return <PastDueDatePage />;
    default:
      return <GeneralPaymentErrorPage />;
  }
};

export default compose<Props, Props>(withMatchParamsHandlers)(PaymentPageContainer);
