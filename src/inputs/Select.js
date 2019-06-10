import React from 'react';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import MuiSelect from '@material-ui/core/Select';
import { useField } from '@kemsu/form';

function getValue(event) {
  return event.target.value;
}

function Select({ comp, name, validate,
  helperText, variant, margin, children, label, ...props }) {

  const { value, error, touched, dirty, onChange, onBlur } = useField(comp, name, validate, getValue);
  const showError = touched && dirty && Boolean(error);

  return <FormControl error={showError} variant={variant || 'filled'} onBlur={onBlur} margin={margin || 'dense'} {...props}>
    {label !== undefined && <InputLabel>{label}</InputLabel>}
    <MuiSelect error={showError} value={value || ''}
      onChange={onChange}
      input={<FilledInput />}
      children={children}
    />
    {showError && <FormHelperText error={showError}>{showError ? error : helperText}</FormHelperText>}
  </FormControl>;
}

export default React.memo(Select);


