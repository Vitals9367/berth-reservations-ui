import { mountWithIntl } from '../../../utils/testUtils';

import React from 'react';
import { CustomInput, CustomInputProps } from 'reactstrap';
import Input from './Input';

describe('components/common/Input', () => {
  const defaultProps: CustomInputProps = {
    className: 'vene-input',
    type: 'checkbox',
  };

  const getWrapper = (props?: object) => mountWithIntl(<Input {...defaultProps} {...props} />);

  test('render Input element normally', () => {
    const input = getWrapper().find(CustomInput);

    expect(input).toHaveLength(1);
    expect(input.prop('type')).toEqual(defaultProps.type);
    expect(input.prop('id')).toBeDefined();
  });

  test('contain passed className, and default className', () => {
    const wrapper = getWrapper({ className: 'foo' });
    const input = wrapper.find(CustomInput);

    expect(input.length).toEqual(1);
    expect(input.prop('className')).toContain('foo');
    expect(input.prop('className')).toContain(defaultProps.className);
  });

  test('placeholder and label text get translated', () => {
    const wrapper = getWrapper({ placeholder: 'test.message', label: 'test.message' });
    const input = wrapper.find(CustomInput);

    expect(input.prop('placeholder')).toEqual('Test message');
    expect(input.prop('label')).toEqual('Test message');
  });
});
