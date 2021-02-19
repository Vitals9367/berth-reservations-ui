import React from 'react';

import './properties.scss';
import Property from './Property';

export interface PropertiesProps {
  electricity: boolean;
  gate: boolean;
  lighting: boolean;
  wasteCollection: boolean;
}

const Properties = ({ electricity, gate, lighting, wasteCollection }: PropertiesProps) => {
  return (
    <div className="vene-berth-properties">
      {electricity && <Property icon="plug" labelKey="page.profile.berths.berthOffer.berthInfo.electricity" />}
      {gate && <Property icon="fence" labelKey="page.profile.berths.berthOffer.berthInfo.gate" />}
      {lighting && <Property icon="streetLight" labelKey="page.profile.berths.berthOffer.berthInfo.lighting" />}
      {wasteCollection && <Property icon="trash" labelKey="page.profile.berths.berthOffer.berthInfo.wasteCollection" />}
    </div>
  );
};

export default Properties;
