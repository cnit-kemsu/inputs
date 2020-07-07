import React, { createElement } from 'react';
import ReactDOM from 'react-dom';
import MenuItem from '@material-ui/core/MenuItem';
import { useForm, useComposite, useFieldArray, useFormSubscriber, Fields } from '@kemsu/form';
import TextField from '../src/inputs/TextField';
import Checkbox from '../src/inputs/Checkbox';
import Select from '../src/inputs/Select';
import DateTimePicker from '../src/inputs/DateTimePicker';
import PickersUtilsProvider from '../src/PickersUtilsProvider';
import Editor from '../src/inputs/Editor';
import DragAndDropImageDialog from '../src/inputs/DragAndDropImageDialog';
import { deserializeDate } from '../src/deserializeDate';
import { deserializeEditorContent } from '../src/deserializeEditorContent';
import ArrayCheckbox from '../src/inputs/ArrayCheckbox';
import{ RadioButtonGroup, RadioButton } from '../src/inputs/RadioButtons';
import DragAndDropPDFDialog from '../src/inputs/DragAndDropPDFDialog';

function validateFirstname(value) {
  if (!value) return 'Firstname must be defined';
  if (value && value.split(' ').length > 1) return 'Firstname must contain one word';
  return undefined;
}

function validateDate(value) {
  if (value) {
    if (value.getFullYear() === 2019) return 'Invalid year';
  }
  return undefined;
}

function ResetButton({ comp, style }) {

  console.log('render ResetButton');
  const { dirty, reset } = useFormSubscriber(comp);
  
  return <button data-control disabled={!dirty} onClick={reset} style={style}>Reset</button>;
}
ResetButton = React.memo(ResetButton);

function SubmitButton({ comp, style }) {

  console.log('render SubmitButton');
  const { hasErrors, touched, submit } = useFormSubscriber(comp);
  
  return <button data-control disabled={hasErrors && touched} onClick={submit} style={style}>Submit</button>;
}
SubmitButton = React.memo(SubmitButton);

function SubmitErrors({ comp }) {

  console.log('render SubmitErrors');
  const { submitErrors } = useFormSubscriber(comp);
  
  return <div style={{ color: 'red' }}>{submitErrors}</div>;
}
SubmitErrors = React.memo(SubmitErrors);

async function handleSubmit(values) {
  await new Promise(resolve => setTimeout(resolve, 2000));
  console.log('submitValues: ', values);
  JSON.stringify(values, null, 1) |> console.log;

  if (values.firstname === 'John') return 'John is invalid firstname';
}

const initValues = {

  richtext: {
    blocks: [
      {
        key: "78qt8",
        text: "some text!",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      }
    ],
    entityMap: {}
  },

  firstname: 'John',

  date1: '2019-06-11 15:18:00'
};

function deserialize(values) {
  values.date1 = deserializeDate(values.date1);
  values.date2 = deserializeDate(values.date2);
  values.richtext = deserializeEditorContent(values.richtext);
}

function App() {

  console.log('render App');
  const form = useForm(handleSubmit, initValues, null, { deserialize });

  return (
    <Fields comp={form}>

      <div>
        <h3>Editor</h3>
        <Editor name="richtext" style={{ maxWidth: '600px' }} />
      </div>

      <div>
        <h3>Checkbox</h3>
        <Checkbox label="Cheked" name="cheked" />
      </div>

      <div>
        <h3>Select</h3>
        <Select label="Select option" name="selected" style={{ width: '200px' }}>
          <MenuItem value="">Not selected</MenuItem>
          <MenuItem value="1">option 1</MenuItem>
          <MenuItem value="2">option 2</MenuItem>
          <MenuItem value="3">option 3</MenuItem>
        </Select>
      </div>

      <div>
        <h3>DateTimePicker</h3>
        <DateTimePicker label="Date 1" name="date1" validate={validateDate} />
        <DateTimePicker label="Date 2" name="date2" validate={validateDate} style={{marginLeft: '8px' }} />
      </div>

      <div>
        <h3>TextField</h3>
        <TextField label="Firstname" name="firstname" validate={validateFirstname} />
      </div>

      <div>
        <h3>DragAndDropFileDialog</h3>
        <DragAndDropImageDialog label="Picture" style={{ width: "300px" }} name="picture" style={{ width: '200px', height: '200px' }} />
        <DragAndDropPDFDialog label="Document" style={{ width: "300px" }} name="document" style={{ width: '200px', height: '200px', marginLeft: '20px' }} />
      </div>

      <div>
        <h3>RadioButtonGroup</h3>
        <RadioButtonGroup name="reply">
          <RadioButton value="1" label="1" />
          <RadioButton value="2" label="2" />
          <RadioButton value="3" label="3" />
        </RadioButtonGroup>
      </div>

      <div>
        <h3>ArrayCheckbox</h3>
        <ArrayCheckbox name="array" arrayValue="a" label="1" />
        <ArrayCheckbox name="array" arrayValue="b" label="b" />
        <ArrayCheckbox name="array" arrayValue="c" label="c" />
      </div>

      <br />

      <div>
        <SubmitErrors />
      </div>

      <div>
        <ResetButton />
        <SubmitButton style={{ marginLeft: '4px' }} />
      </div>

    </Fields>
  );
}

const root = () => (
  <PickersUtilsProvider>
    <App />
  </PickersUtilsProvider>
);

ReactDOM.render(
  createElement(root),
  document.getElementById('root')
);