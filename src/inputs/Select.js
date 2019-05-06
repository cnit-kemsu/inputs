import React, { createElement } from 'react';
import MuiTextField from '@material-ui/core/TextField';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import MuiSelect from '@material-ui/core/Select';
import { useField } from '@kemsu/form';

function getValue(event) {
  return event.target.value;
}

function Select({comp, name, validate,
  helperText, variant, margin, children, label, ...props}) {

  const { value, error, touched, dirty, onChange, onBlur } = useField(comp, name, validate, getValue);
  const showError = touched && dirty && Boolean(error);

  return <FormControl variant={variant || 'filled'} onBlur={onBlur} margin={margin || 'dense'} {...props}>
    {label !== undefined && <InputLabel>{label}</InputLabel>}
    <MuiSelect value={value || ''}
      onChange={onChange}
      input={<FilledInput />}
      children={children}
    />
    {showError && <FormHelperText>{showError ? error : helperText}</FormHelperText>}
  </FormControl>;

  // return createElement(MuiTextField, {
  //   value: value || '',
  //   onChange: onChange,
  //   onBlur: onBlur,
  //   error: showError,
  //   helperText: showError ? error : helperText,
  //   multiline: multiline,
  //   variant: variant || multiline ? 'outlined' : 'filled',
  //   margin: margin || 'dense',
  //   ...props
  // });
}

export default React.memo(Select);


