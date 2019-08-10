import { createEditorStateWithContent } from '@kemsu/editor';

export function deserializeEditorContent(value) {
  if (!value) return createEditorStateWithContent();
  if (value instanceof Object && value?.constructor?.name !== 'EditorState') return createEditorStateWithContent(value);
  return value;
}