import React, { useCallback } from 'react';
import MaskedInput from 'react-text-mask';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useField } from '@kemsu/form';

const mask = [/\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/];
function DaysTimeMaskInput({ inputRef, ...props }) {
  const ref = useCallback(_ => {
    inputRef(_ ? _.inputElement : null);
  }, []);

  return <MaskedInput
    ref={ref}
    mask={mask}
    placeholderChar={'0'}
    showMask
    {...props}
  />;
}

function parseDaysTime(value = '00 00:00') {
  return {
    days: value.substring(0, 2) |> Number,
    hours: value.substring(3, 5) |> Number,
    minutes: value.substring(6, 8) |> Number
  };
}

function validateDaysTime({ days, hours, minutes }) {
  if (days > 33) return 'Первышено максимальное количество дней';
  if (hours > 23) return 'Указано неверное количество часов';
  if (minutes > 59) return 'Указано неверное количество минут';
}

function DaysTimeField({ comp, name, validate, helperText, margin, label, ...props }) {

  const _validate = useCallback(value => {
    const _value = parseDaysTime(value);
    const error = validateDaysTime(_value);
    if (error) return error;
    if (validate != null) return validate(_value);
  }, []);
  const { value, error, touched, dirty, onChange, onBlur } = useField(comp, name, _validate);
  const showError = touched && dirty && Boolean(error);

  return <FormControl error={showError} onBlur={onBlur} margin={margin || 'dense'} {...props}>
    {label !== undefined && <InputLabel>{label}</InputLabel>}
    <Input
      value={value}
      onChange={onChange}
      error={showError}
      inputComponent={DaysTimeMaskInput}
    />
    {showError && <FormHelperText error={showError}>{showError ? error : helperText}</FormHelperText>}
  </FormControl>;
}

export default React.memo(DaysTimeField);