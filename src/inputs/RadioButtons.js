import React from 'react';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useField } from '@kemsu/form';

function handleValue(event) {
  return event.target.value;
}

const RadioButtonGroupProps = {
  handleValue
};

function RadioButtonGroup({ comp, name, children, validate, helperText, ...props }) {
  const { onChange, onBlur, error, touched, dirty, } = useField(comp, name, validate, RadioButtonGroupProps);
  const showError = touched && dirty && Boolean(error);

  return <FormControl component="fieldset" {...props}>
    <RadioGroup name={name} onChange={onChange} onBlur={onBlur}>
      {children}
    </RadioGroup>
    {(showError || helperText) && <FormHelperText error={showError}>{showError ? error : helperText}</FormHelperText>}
  </FormControl>;
}
RadioButtonGroup = React.memo(RadioButtonGroup);

function RadioButton({ label, value, color = 'primary', labelProps, ...props }) {

  return <FormControlLabel value={value} control={<Radio color={color} {...props} />} label={label} {...labelProps} />;
}
RadioButton = React.memo(RadioButton);

export {
  RadioButtonGroup,
  RadioButton
};