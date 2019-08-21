import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useField } from '@kemsu/form';
import { Editor as DraftEditor, convertEditorStateToRawContent } from '@kemsu/editor';


const EditorProps = {
  serialize(value) {
    if (!value) return value;
    const rawContent = convertEditorStateToRawContent(value);
    for (const entity of Object.values(rawContent.entityMap)) {
      if (entity.type === 'IMAGE') {
        const data = { ...entity.data };
        //if (data.file) data.file = 'FILE!!!'; // DEBUG
        entity.data = data;
      }
    }
    return rawContent;
  }
};

function Editor({ comp, name, validate, label, helperText, placeholder, ...props }) {

  const { value, error, touched, dirty, onChange, onBlur } = useField(comp, name, validate, EditorProps);
  const showError = touched && dirty && Boolean(error);
  //console.log(value ? convertEditorStateToRawContent(value) : undefined);
  // return createElement(DraftEditor, {
  //   editorState: value,
  //   onChange: onChange,
  //   onBlur: onBlur
  // });
  return <div {...props}>
    {label !== undefined && <Typography>{label}</Typography>}
    <DraftEditor {...{ editorState: value, onChange, placeholder, onBlur }}
    />
    {(showError || helperText) && <FormHelperText error={showError}>{showError ? error : helperText}</FormHelperText>}
  </div>;
}

export default React.memo(Editor);