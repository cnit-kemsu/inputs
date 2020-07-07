import React from 'react';
import MuiCheckbox from '@material-ui/core/Checkbox';
import { useField } from '@kemsu/form';

const CheckboxProps = {
  handleValue(event) {
    return event.target.checked;
  }
};

function Checkbox({ comp, name, validate, ...props }) {
  const { value, onChange, onBlur } = useField(comp, name, validate, CheckboxProps);

  return <MuiCheckbox
    checked={value || false}
    onChange={onChange}
    onBlur={onBlur}
    {...props}
  />;
}

export default React.memo(Checkbox);