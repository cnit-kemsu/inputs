import React, { createElement } from 'react';
import MuiTextField from '@material-ui/core/TextField';
import { useField } from '@kemsu/form';

function getNumberValue(event) {
  const value = event.currentTarget.value;
  if (value === '') return undefined;
  return Number(value);
}

function TextField({ comp, name, validate,
  helperText, multiline, variant, margin,
  type, ...props }) {

  const { value, error, touched, dirty, onChange, onBlur } = useField(comp, name, validate, type === 'number' ? getNumberValue : undefined);
  const showError = touched && dirty && Boolean(error);

  return createElement(MuiTextField, {
    value: value || '',
    onChange: onChange,
    onBlur: onBlur,
    error: showError,
    helperText: showError ? error : helperText,
    multiline: multiline,
    variant: variant || multiline ? 'outlined' : 'filled',
    margin: margin || 'dense',
    type,
    ...props
  });
}

export default React.memo(TextField);