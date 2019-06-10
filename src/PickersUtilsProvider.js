import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import ruLocale from 'date-fns/locale/ru';

export default function PickersUtilsProvider({ children, ...props }) {

  return <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale} {...props}>
    {children}
  </MuiPickersUtilsProvider>;
}