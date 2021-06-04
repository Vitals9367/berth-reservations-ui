import { Button } from 'hds-react';
import { useTranslation } from 'react-i18next';

import { ContactInfo as ContactInfoType } from '../types';
import LabelValuePair from '../../../common/labelValuePair/LabelValuePair';
import './contactInfo.scss';

export type ContactInfoProps = {
  contactInfo?: ContactInfoType;
  handleEdit(): void;
};

const ContactInfo = ({ contactInfo, handleEdit }: ContactInfoProps) => {
  const { t } = useTranslation();

  if (!contactInfo) {
    return <div>Sinulla ei ole vielä profiilia. Luo uusi profiili tästä.</div>;
  }

  const {
    firstName,
    lastName,
    address,
    postalCode,
    municipality,
    phoneNumber,
    emailAddress,
    customerGroup,
    language,
  } = contactInfo;
  return (
    <div className="vene-contact-info">
      <h1>{t('page.profile.contact.heading', { name: `${firstName} ${lastName}` })}</h1>
      <div className="vene-contact-info__section">
        <LabelValuePair label={t('page.profile.contact.address')} value={address} />
        <LabelValuePair label={t('page.profile.contact.postal_code')} value={postalCode} />
        <LabelValuePair label={t('page.profile.contact.municipality')} value={municipality} />
      </div>
      <div className="vene-contact-info__section">
        <LabelValuePair label={t('page.profile.contact.phone_number')} value={phoneNumber} />
        <LabelValuePair label={t('page.profile.contact.email_address')} value={emailAddress} />
      </div>
      <div className="vene-contact-info__section">
        <LabelValuePair label={t('page.profile.contact.customer_group')} value={customerGroup} />
        <LabelValuePair label={t('page.profile.contact.language')} value={t(`common.language.${language}`)} />
      </div>
      <Button size="small" onClick={handleEdit}>
        {t('page.profile.contact.edit')}
      </Button>
    </div>
  );
};

export default ContactInfo;
