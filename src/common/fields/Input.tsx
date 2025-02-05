import classNames from 'classnames';
import { Field, FieldRenderProps } from 'react-final-form';
import { WithTranslation } from 'react-i18next';
import { FormFeedback, FormGroup, FormText, Input, InputProps } from 'reactstrap';

import validator, { mustBePresent } from '../utils/formValidation';
import Label from './Label';
import './input.scss';

type Props = WithTranslation & FieldRenderProps<string, HTMLElement>;

const TextInput = (type: InputProps['type']) => ({
  t,
  id,
  name,
  label,
  readOnly,
  required,
  text,
  validate,
  placeholder,
  tReady, // Excluded from 'rest'
  ...rest
}: Props) => {
  return (
    <Field
      name={name}
      type={type}
      required={required}
      validate={validator(required ? mustBePresent : null, validate || null)}
    >
      {({ input, meta }) => (
        <FormGroup>
          {label && <Label htmlFor={id} required={required} text={label} />}
          <Input
            className={classNames('vene-input', {
              'vene-input--read-only': readOnly,
            })}
            id={id}
            required={required}
            readOnly={readOnly}
            invalid={!!(meta.touched && meta.error)}
            placeholder={placeholder ? t(placeholder) : ''}
            {...input}
            {...rest}
            type={type}
          />
          {meta.error && (
            <FormFeedback>
              <span>{t(meta.error)}</span>
            </FormFeedback>
          )}
          {text && (
            <FormText>
              <span>{t(text)}</span>
            </FormText>
          )}
        </FormGroup>
      )}
    </Field>
  );
};

export default TextInput;
