import React, { createElement } from 'react';
import { useField } from '@kemsu/form';
import { Editor as DraftEditor, createEditorStateWithContent } from '@kemsu/editor';

function getEditorState(value) {
  return value;
}

function Editor({ comp, name, validate }) {

  const { value, error, touched, dirty, onChange, onBlur } = useField(comp, name, validate, getEditorState);

  return createElement(DraftEditor, {
    editorState: value || createEditorStateWithContent(),
    onChange: onChange,
    onBlur: onBlur
  });
}

export default React.memo(Editor);