import React from 'react';
import MuiCheckbox from '@material-ui/core/Checkbox';
import { useField } from '@kemsu/form';

const ArrayCheckboxProps = {
  handleValue(event, value, { arrayValue }) {
    if (event.target.checked) {
      if (!value) return [arrayValue];
      if (!value.includes(arrayValue)) return [...value, arrayValue];
    } else {
      if (!value) return [];
      return value.filter(val => val !== arrayValue);
    }
  }
};

function ArrayCheckbox({ comp, name, arrayValue, validate, ...props }) {
  const { value, onChange, onBlur } = useField(comp, name, validate, ArrayCheckboxProps, { arrayValue });

  return <MuiCheckbox
    checked={value?.includes(arrayValue) || false}
    onChange={onChange}
    onBlur={onBlur}
    {...props}
  />;
}

export default React.memo(ArrayCheckbox);