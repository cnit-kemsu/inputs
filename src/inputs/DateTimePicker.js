import React from 'react';
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { useField } from '@kemsu/form';

function getDate(value) {
  return value;
}

function deserialize(value) {
  if (!value) return null;
  if (!(value instanceof Date)) return new Date(value);
  return value;
}

function DateTimePicker({ comp, name, validate, helperText, ...props }) {

  const { value, error, touched, dirty, onChange, onBlur } = useField(comp, name, validate, getDate, deserialize);
  const showError = touched && dirty && Boolean(error);

  return <KeyboardDateTimePicker
    {...{
      value,
      onChange,
      onBlur,
      error: showError,
      helperText: showError ? error : helperText
    }}
    variant="inline"
    ampm={false}
    format="dd/MM/yyyy HH:mm"
    {...props}
  />;
}

export default React.memo(DateTimePicker);