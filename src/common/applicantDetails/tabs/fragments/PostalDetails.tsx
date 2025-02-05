import { Col, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';

import { mustBeAddress, mustBePostalCode } from '../../../utils/formValidation';
import { Select, Text } from '../../../fields/Fields';
import { MUNICIPALITIES, PRIORITIZED_MUNICIPALITIES } from '../../../utils/constants';

const PostalDetails = () => {
  const { t, i18n } = useTranslation();

  const renderMunicipalityOption = (municipality: { id: string; translations: Record<string, string> }) => {
    const translated = municipality.translations[i18n.language] ?? municipality.translations.fi;
    return (
      <option key={municipality.id} value={municipality.translations.fi}>
        {translated}
      </option>
    );
  };

  return (
    <Row>
      <Col sm={4}>
        <Text
          name={`address`}
          label={`form.postal_details.field.street_address.label`}
          placeholder={`form.postal_details.field.street_address.placeholder`}
          required
          validate={mustBeAddress}
          readOnly
        />
      </Col>
      <Col sm={4}>
        <Text
          name={`zipCode`}
          label={`form.postal_details.field.postal_code.label`}
          placeholder={`form.postal_details.field.postal_code.placeholder`}
          required
          validate={mustBePostalCode}
          readOnly
        />
      </Col>
      <Col sm={4}>
        <Select name={`municipality`} label={`form.postal_details.field.municipality.label`} required disabled>
          <option value="" disabled hidden>
            {t('form.postal_details.field.municipality.placeholder')}
          </option>
          {PRIORITIZED_MUNICIPALITIES.map(renderMunicipalityOption)}
          <option value="" disabled>
            -
          </option>
          {MUNICIPALITIES.map(renderMunicipalityOption)}
        </Select>
      </Col>
    </Row>
  );
};
export default PostalDetails;
