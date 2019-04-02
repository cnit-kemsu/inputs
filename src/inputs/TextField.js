import React, { createElement } from 'react';
import MuiTextField from '@material-ui/core/TextField';
import { useField } from '@kemsu/form';

function TextField({comp, name, validate,
  helperText, multiline, variant, margin, ...props}) {

  const { value, error, touched, dirty, onChange, onBlur } = useField(comp, name, validate);
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
    ...props
  });
}

export default React.memo(TextField);