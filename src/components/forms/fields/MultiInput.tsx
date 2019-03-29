import React, { Fragment } from 'react';
import { FormGroup, CustomInput, FormText, FormFeedback } from 'reactstrap';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { Field, FieldProps } from 'react-final-form';
import validator, { mustBePresent } from '../../../utils/formValidation';

import Label from './Label';

type Props = {
  items: { name: string; label: string; value: string }[];
} & FieldProps &
  InjectedIntlProps;

type CustomInputType = 'select' | 'file' | 'radio' | 'checkbox' | 'switch';

const TextInput = (type: CustomInputType) => ({
  id,
  name,
  label,
  required,
  items,
  text,
  validate,
  placeholder,
  intl: { formatMessage },
  ...rest
}: Props) => (
  <Fragment>
    <FormGroup>
      {label && <Label htmlFor={id} required={required} text={label} />}
      {items.map(({ name: itemName, label: itemLabel, value: itemValue }) => {
        const key = `${id}_${itemName}_${itemValue}`;
        return (
          <Field
            key={key}
            name={itemName}
            type={type}
            required={required}
            value={itemValue}
            validate={validator(required ? mustBePresent : null, validate || null)}
          >
            {({ input, meta }) => (
              <CustomInput
                id={key}
                type={type}
                required={required}
                label={formatMessage({ id: itemLabel })}
                invalid={!!(meta.touched && meta.error)}
                {...input}
                {...rest}
              >
                {meta.error && (
                  <FormFeedback>
                    <FormattedMessage id={meta.error} />
                  </FormFeedback>
                )}
              </CustomInput>
            )}
          </Field>
        );
      })}
      {text && (
        <FormText>
          <FormattedMessage id={text} />
        </FormText>
      )}
    </FormGroup>
  </Fragment>
);

export default TextInput;
