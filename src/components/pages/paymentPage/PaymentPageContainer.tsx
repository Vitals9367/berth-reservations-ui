import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import PaymentPage from './PaymentPage';
import ContractPage from './ContractPage';
import { CONFIRM_PAYMENT, FULFILL_CONTRACT, GET_ORDER_DETAILS } from '../../../utils/graphql';
import { getOrderNumber } from '../../../utils/urls';
import GeneralPaymentErrorPage from './paymentError/GeneralPaymentErrorPage';
import AlreadyPaidPage from './paymentError/AlreadyPaidPage';
import PastDueDatePage from './paymentError/PastDueDatePage';
import LoadingPage from '../../../common/loadingPage/LoadingPage';
import {
  ConfirmPayment,
  ConfirmPaymentVariables,
} from '../../../utils/__generated__/ConfirmPayment';
import { OrderTypeEnum, OrderStatus } from '../../../__generated__/globalTypes';
import {
  OrderDetails,
  OrderDetailsVariables,
  OrderDetails_contractAuthMethods as ContractAuthMethods,
} from '../../../utils/__generated__/OrderDetails';
import {
  FulfillContract,
  FulfillContractVariables,
} from '../../../utils/__generated__/FulfillContract';

const PaymentPageContainer = () => {
  const orderNumber = getOrderNumber(window.location.search);

  const [isRedirecting, setIsRedirecting] = useState(false);

  const {
    loading: loadingOrderDetails,
    data: orderDetailsData,
    error: orderDetailsError,
  } = useQuery<OrderDetails, OrderDetailsVariables>(GET_ORDER_DETAILS, {
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

  const [fulfillContract] = useMutation<FulfillContract, FulfillContractVariables>(
    FULFILL_CONTRACT
  );

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

  if (
    loadingOrderDetails ||
    loadingConfirmPayment ||
    isRedirecting ||
    !orderDetailsData?.contractSigned
  ) {
    return <LoadingPage />;
  }
  if (confirmError || orderDetailsError) {
    return <GeneralPaymentErrorPage />;
  }

  return getPaymentPage(
    orderDetailsData?.orderDetails?.orderType,
    orderNumber,
    orderDetailsData.contractSigned.isSigned,
    orderDetailsData?.orderDetails?.status,
    orderDetailsData?.contractAuthMethods ?? [],
    confirmPayment,
    handleSignContract
  );
};

export const getPaymentPage = (
  orderType: OrderTypeEnum | undefined,
  orderNumber: string,
  contractSigned: boolean | null,
  status: OrderStatus | undefined | null,
  contractAuthMethods: ContractAuthMethods[],
  confirmPayment: () => void,
  signContract: (authMethod: string) => void
): JSX.Element => {
  if (!status) {
    return <GeneralPaymentErrorPage />;
  }

  switch (status) {
    case OrderStatus.WAITING:
      return contractSigned || contractSigned === null ? (
        <PaymentPage handlePay={confirmPayment} />
      ) : (
        <ContractPage
          orderNumber={orderNumber}
          handleSign={signContract}
          contractAuthMethods={contractAuthMethods}
        />
      );
    case OrderStatus.PAID:
      return <AlreadyPaidPage />;
    case OrderStatus.EXPIRED:
      return <PastDueDatePage />;
    default:
      return <GeneralPaymentErrorPage />;
  }
};

export { PaymentPageContainer };
