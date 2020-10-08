import queryString from 'query-string';

export const getOrderNumber = (searchString: string): string | null => {
  const parsed = queryString.parse(searchString);
  const orderNumber = parsed.order_number;

  if (Array.isArray(orderNumber) || !orderNumber) {
    return null;
  }
  return orderNumber;
};

export const getPaymentSuccess = (searchString: string): boolean => {
  const parsed = queryString.parse(searchString);
  const paymentStatus = parsed.payment_status;
  return paymentStatus === 'success';
};

export const getTermsDocumentUrl = (language: string): string => {
  return `/Helsingin_talvisäilytyspaikan_vuokrasopimusehdot-${language}.pdf`;
};
