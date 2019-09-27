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
import { deserializeDate } from '../src/lib/deserializeDate';
import { deserializeEditorContent } from '../src/lib/deserializeEditorContent';
import ArrayCheckbox from '../src/inputs/ArrayCheckbox';

function validateForm({ firstname, data }) {
  if (firstname && data?.address?.city)
  if (firstname === data.address.city) return {
    firstname: 'Firstname must be distinct from city',
    data: {
      address: {
        city: 'City must be distinct from firstname'
      }
    }
  };
  return undefined;
}

function validateFirstname(value) {
  if (!value) return 'Firstname must be defined';
  if (value && value.split(' ').length > 1) return 'Firstname must contain one word';
  return undefined;
}

function validateCity(value) {
  if (!value) return 'City must be defined';
  return undefined;
}

function validatePasswords(values) {
  if (values) {
    const { password, confirmPassword } = values;
    if (password !== confirmPassword) return [
      undefined,
      'Passwords must be identical'
    ];
  }
  return undefined;
}

function validateDate(value) {
  if (value) {
    if (value.getFullYear() === 2019) return 'Invalid year';
  }
  return undefined;
}

function validatePassword(password) {
  if (password && password.length < 5) return 'Password must contain more than 5 characters';
  return undefined;
}

function validateFriends(friends) {
  if (friends?.length < 2) return [undefined, 'There must be at least 2 friends'];
  return undefined; 
}

function Passwords({ comp }) {

  console.log('render Passwords');
  const [passwords, { error, touched, dirty, onBlur }] = useComposite(comp, 'data.passwords', validatePasswords);

  return (
    <div onBlur={onBlur} style={{ padding: '5px', margin: '5px', width: 'fit-content', border: '2px solid black' }}>
      <div>
        touched: {touched ? 'true' : 'false'}, dirty: {dirty ? 'true' : 'false'}
      </div>
      <div>
        <TextField comp={passwords} label="Password" name="password" validate={validatePassword}/>
        <TextField comp={passwords} label="Confirm password" name="confirmPassword" />
      </div>
      <div>
        {error && <div style={touched && dirty ? { color: 'red' } : {}}>{error}</div>}
      </div>
    </div>
  );
}
Passwords = React.memo(Passwords);

// function FriendItem({ comp: friend }) {

//   console.log('render Friend:', friend.index);
  
//   return (
//     <div style={{ padding: '5px', margin: '5px', border: '2px solid black', width: 'fit-content' }}>
//       <div style={{ display: 'flex' }}>
//         <Fields comp={friend}>
//           <TextField label="Firstname" name="firstname" />
//           <TextField label="Lastname" name="lastname" />
//         </Fields>
//       </div>
//       <button data-control onClick={friend.delete}>Delete</button>
//     </div>
//   );
// }
// FriendItem = React.memo(FriendItem);

// function Friends({ comp }) {

//   console.log('render Friends');
//   const [, { map, push, error, dirty, touched, onBlur }] = useFieldArray(comp, 'friends', validateFriends);

//   return (
//     <div onBlur={onBlur} style={{ padding: '10px', border: '3px solid black', width: 'fit-content' }}>
//       <div>
//         touched: {touched ? 'true' : 'false'}, dirty: {dirty ? 'true' : 'false'}
//       </div>
//       <div>
//         {map((key, friend) => (
//             <Editor key={key} comp={friend} />
//         ))}
//       </div>
//       {error && <div style={touched && dirty ? { color: 'red' } : {}}>{error}</div>}
//       <div>
//         <button data-control onClick={() => push()}>Add friend</button>
//       </div>
//     </div>
//   );
// }
// Friends = React.memo(Friends);

function FriendItem({ comp: friend }) {

  console.log('render Friend:', friend.index);
  
  return (
    <div style={{ padding: '5px', margin: '5px', border: '2px solid black', width: 'fit-content' }}>
      <div style={{ display: 'flex' }}>
        <Fields comp={friend}>
          <Editor label="Friend Description" name="content" helperText="helper text" placeholder="type here..." />
        </Fields>
      </div>
      <button data-control onClick={friend.delete}>Delete</button>
    </div>
  );
}
FriendItem = React.memo(FriendItem);

function Friends({ comp }) {

  console.log('render Friends');
  const [, { map, push, error, dirty, touched, onBlur }] = useFieldArray(comp, 'friends');

  return (
    <div onBlur={onBlur} style={{ padding: '10px', border: '3px solid black', width: 'fit-content' }}>
      <div>
        touched: {touched ? 'true' : 'false'}, dirty: {dirty ? 'true' : 'false'}
      </div>
      <div>
        {map((key, friend) => (
          <FriendItem key={key} comp={friend} />
        ))}
      </div>
      {error && <div style={touched && dirty ? { color: 'red' } : {}}>{error}</div>}
      <div>
        <button data-control onClick={() => push()}>Add friend</button>
      </div>
    </div>
  );
}
Friends = React.memo(Friends);

function ResetButton({ comp }) {

  console.log('render ResetButton');
  const { dirty, reset } = useFormSubscriber(comp);
  
  return <button data-control disabled={!dirty} onClick={reset}>Reset</button>;
}
ResetButton = React.memo(ResetButton);

function SubmitButton({ comp }) {

  console.log('render SubmitButton');
  const { hasErrors, touched, submit } = useFormSubscriber(comp);
  
  return <button data-control disabled={hasErrors && touched} onClick={submit}>Submit</button>;
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
  firstname: 'John',
  friends: [
    // {
    //   firstname: 'John',
    //   lastname: 'Cooper'
    // }
    {
      content: {
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
      }
    }
  ],
  // contents: [
  //   {
  //     blocks: [
  //     {
  //       key: "78qt8",
  //       text: "some text!",
  //       type: "unstyled",
  //       depth: 0,
  //       inlineStyleRanges: [],
  //       entityRanges: [],
  //       data: {}
  //     }
  //     ],
  //     entityMap: {}
  //   }
  // ],
  date: '2019-06-11 15:18:00'
};

function deserialize(values) {
  values.date = deserializeDate(values.date);
  values.date2 = deserializeDate(values.date2);
  values.friends[0].content = deserializeEditorContent(values.friends[0].content);
}

function App() {

  console.log('render App');
  const form = useForm(handleSubmit, initValues, validateForm, { deserialize });

  return (
    <Fields comp={form}>
      {/* <div>
        <Editor name="contents.0" />
      </div> */}
      {/* <div>
        <Checkbox label="Cheked" name="cheked" />
      </div>
      <div>
        <Select label="Select" name="select">
          <MenuItem value="">Не выбрано</MenuItem>
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
        </Select>
      </div> */}
      {/* <div>
        <DateTimePicker label="Date" name="date" validate={validateDate} />
      </div>
      <div>
        <DateTimePicker label="Date 2" name="date2" validate={validateDate} />
      </div> */}
      {/* <div>
        <TextField label="Firstname" name="firstname" validate={validateFirstname} />
      </div>
      <div>
        <TextField label="City" name="data.address.city" validate={validateCity}/>
      </div>
      <div>
       <Passwords />
      </div> */}
      {/* <div>
        <Friends />
      </div> */}
      <DragAndDropImageDialog label="Picture" style={{ width: "300px" }} name="picture" />
      <div>
        <SubmitErrors />
      </div>
      <div style={{ display: 'flex', padding: '10px' }}>
        <ResetButton style={{ margin: '5px' }} />
        <SubmitButton style={{ margin: '5px' }} />
      </div>

      <div>
        <ArrayCheckbox name="reply" arrayValue="5" />
        <ArrayCheckbox name="reply" arrayValue="abc" />
        <ArrayCheckbox name="reply" arrayValue={7} />
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