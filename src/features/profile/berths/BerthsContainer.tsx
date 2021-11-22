import { useParams } from 'react-router';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Notification } from 'hds-react';
import { getOperationName } from 'apollo-link';
import { useTranslation } from 'react-i18next';

import Spinner from '../../../common/spinner/Spinner';
import { getCustomerBerthsProps } from './__fixtures__/mockData';
import { BERTHS } from './__generated__/BERTHS';
import {
  DELETE_BERTH_APPLICATION,
  DELETE_BERTH_APPLICATIONVariables as DELETE_BERTH_APPLICATION_VAR,
} from './__generated__/DELETE_BERTH_APPLICATION';
import Berths from './Berths';
import { BERTHS_QUERY, DELETE_BERTH_APPLICATION_MUTATION } from './queries';
import { getChoicesFromBerthApplication } from './utils';

const BerthsContainer = () => {
  // TODO: Get real data
  const { id } = useParams<{ id: string }>();
  const { offer, invoice, reservations } = getCustomerBerthsProps(id);
  // end TODO
  const { t } = useTranslation();

  const { loading, error, data } = useQuery<BERTHS>(BERTHS_QUERY);
  const [deleteBerthApplication] = useMutation<DELETE_BERTH_APPLICATION, DELETE_BERTH_APPLICATION_VAR>(
    DELETE_BERTH_APPLICATION_MUTATION,
    {
      refetchQueries: [getOperationName(BERTHS_QUERY) || 'BERTHS_QUERY'],
    }
  );

  const berthApplications = data?.myProfile?.berthApplications?.edges?.map((edge) => edge?.node) ?? [];
  const applications = berthApplications.map((berthApplication) => ({
    id: berthApplication?.id || '',
    applicationDate: berthApplication?.createdAt,
    choices: getChoicesFromBerthApplication(berthApplication),
  }));

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Notification type="error" label={t('common.error')}>
        {t('common.data_missing_query_error')}
      </Notification>
    );
  }

  const handleDeleteApplication = (berthApplicationId: string) => {
    deleteBerthApplication({
      variables: {
        input: {
          id: berthApplicationId,
        },
      },
    });
  };

  return (
    <Berths
      offer={offer}
      invoice={invoice}
      reservations={reservations}
      applications={applications}
      onDeleteApplication={handleDeleteApplication}
    />
  );
};

export default BerthsContainer;
