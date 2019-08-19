import React, { createElement } from 'react';
import { useField } from '@kemsu/form';
import { Editor as DraftEditor, convertEditorStateToRawContent, createEditorStateFromContent, blobs } from '@kemsu/editor';

function toFiles(blobUrl) {
  return blobs[blobUrl];
}

const EditorProps = {
  serialize(value) {
    const rawContent = convertEditorStateToRawContent(value);// |> JSON.stringify |> JSON.parse;
    const _blobs = [];
    for (const entity of Object.values(rawContent.entityMap)) {
      if (entity.type === 'IMAGE' && entity.data.src.substring(0, 4) === 'blob') {
        const data = { ...entity.data };
        const blobIndex = _blobs.indexOf(data.src);
        if (blobIndex === -1) {
          const lastBlobIndex = _blobs.push(data.src) - 1;
          data.src = 'blob=' + lastBlobIndex;
        } else data.src = 'blob=' + blobIndex;
        entity.data = data;
      }
    }
    return [
      rawContent,
      _blobs.length > 0 ? _blobs.map(toFiles) : undefined
    ];
  }
};

function Editor({ comp, name, validate }) {

  const { value, error, touched, dirty, onChange, onBlur } = useField(comp, name, validate, EditorProps);
  //console.log(value ? convertEditorStateToRawContent(value) : undefined);
  return createElement(DraftEditor, {
    editorState: value || createEditorStateFromContent(),
    onChange: onChange,
    onBlur: onBlur
  });
}

export default React.memo(Editor);