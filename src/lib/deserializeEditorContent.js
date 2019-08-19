import { createEditorStateFromContent } from '@kemsu/editor';

export function deserializeEditorContent(value) {
  if (!value) return createEditorStateFromContent();
  if (value instanceof Object && value?.constructor?.name !== 'EditorState') return createEditorStateFromContent(value);
  return value;
}