import React from 'react';
import { KeyboardDateTimePicker, KeyboardDatePicker } from "@material-ui/pickers";
import { useField } from '@kemsu/form';

const DateTimePickerProps = {
  serialize(value) {
    if (value) {
      const sv = (value.toLocaleDateString('ru').split('.') |> #.reverse().join('-'))
        + ' ' + value.toLocaleTimeString('ru');
      return sv;
    }
    return value;
  }
};

function DateTimePicker({ comp, name, validate, helperText, format, ...props }) {

  const { value, error, touched, dirty, onChange, onBlur } = useField(comp, name, validate, DateTimePickerProps);
  const showError = touched && dirty && Boolean(error);

  return <KeyboardDatePicker
    {...{
      value: value || null,
      onChange,
      onBlur,
      error: showError,
      helperText: showError ? error : helperText
    }}
    variant="inline"
    ampm={false}
    //format="dd/MM/yyyy HH:mm"
    format={format || "dd/MM/yyyy"}
    {...props}
  />;
}

export default React.memo(DateTimePicker);