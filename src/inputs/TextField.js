import React, { createElement } from 'react';
import MuiTextField from '@material-ui/core/TextField';
import { useField } from '@kemsu/form';

function TextFieldProps(type) {
  return {
    handleValue(event) {
      if (type === 'number' && event.currentTarget.value) return Number(event.currentTarget.value);
      return event.currentTarget.value;
    }
  };
}

function TextField({ comp, name, validate,
  helperText, multiline, variant, margin, type, ...props }) {

  const { value, error, touched, dirty, onChange, onBlur } = useField(comp, name, validate, TextFieldProps(type));
  const showError = touched && dirty && Boolean(error);

  return createElement(MuiTextField, {
    value: value == null ? '' : value,
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

// function getNumberValue(event) {
//   const value = event.currentTarget.value;
//   if (value === '') return undefined;
//   return Number(value);
// }

// function TextField({ comp, name, validate,
//   helperText, multiline, variant, margin,
//   type, ...props }) {

//   const { value, error, touched, dirty, onChange, onBlur } = useField(comp, name, validate, type === 'number' ? getNumberValue : undefined);
//   const showError = touched && dirty && Boolean(error);

//   return createElement(MuiTextField, {
//     value: value || '',
//     onChange: onChange,
//     onBlur: onBlur,
//     error: showError,
//     helperText: showError ? error : helperText,
//     multiline: multiline,
//     variant: variant || multiline ? 'outlined' : 'filled',
//     margin: margin || 'dense',
//     type,
//     ...props
//   });
// }

// export default React.memo(TextField);