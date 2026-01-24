import {type JSX, useEffect} from "react";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {serializedDocumentFromEditorState} from "@lexical/file";

export default function AutoSavePlugin({lessonId}: {lessonId: number | string}): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  const SAVE_LOCALLY_INTERVAL_MS = 30_000;
  const SAVE_TO_SERVER_INTERVAL_MS = 15 * 60_000;

  useEffect(() => {
    // Immediately save on lesson page load
    saveEditorStateLocally(editor, lessonId);

    const saveEditor = setInterval(() => {
      saveEditorStateLocally(editor, lessonId);  
    }, SAVE_LOCALLY_INTERVAL_MS)

    return () => clearInterval(saveEditor);
  }, [editor, lessonId]);

  useEffect(() => {
    const saveEditorToServer = setInterval(() => {
      console.log('saveEditorToServer');
    }, SAVE_TO_SERVER_INTERVAL_MS);

    return () => clearInterval(saveEditorToServer);
  }, [SAVE_TO_SERVER_INTERVAL_MS, editor, lessonId]);

  return null;
}

const saveEditorStateLocally = (editor: LexicalEditor, lessonId: number | string) => {
      const savedEditorState =
        JSON.stringify(serializedDocumentFromEditorState(editor.getEditorState()));

      sessionStorage.setItem(`lesson-draft-${lessonId}`, savedEditorState);
    }