import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {editorStateFromSerializedDocument, type SerializedDocument} from "@lexical/file";
import {type JSX, use, useEffect} from "react";
import type {SerializedEditorState} from "lexical";
import type {lessonObject} from "../../../../../types/lessonTypes.ts";

export default function LoadPreviousStatePlugin({
  lessonId,
  editorStatePromise,
  isEditMode,
}: {
  lessonId: string | number;
  editorStatePromise?: Promise<lessonObject | undefined | null>;
  isEditMode: boolean;
}): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  const editorData = editorStatePromise ? use(editorStatePromise) : undefined;

  useEffect(() => {
    const autoSavedData = getAutoSavedData(lessonId);

    if (autoSavedData && isEditMode) {
      try {
        const data = JSON.parse(autoSavedData) as SerializedDocument;
        const maxAutoSavedTime = 1000 * 60 * 60;

        if (typeof data.lastSaved === "number" && Date.now() - data.lastSaved < maxAutoSavedTime) {
          const parsedState = editorStateFromSerializedDocument(editor, data);
          editor.update(() => editor.setEditorState(parsedState));
          return;
        }
      } catch (error) {
        console.error("Error loading auto-saved editor state:", error);
      }
    }

    if (!editorData?.content) return;

    try {
      const serverContent = editorData.content as unknown;
      const parsedState = isSerializedDocument(serverContent)
        ? editorStateFromSerializedDocument(editor, serverContent)
        : editor.parseEditorState(serverContent as SerializedEditorState | string);

      editor.update(() => editor.setEditorState(parsedState));
    } catch (error) {
      console.error("Error loading editor state:", error);
    }
  }, [editor, editorData, isEditMode, lessonId]);

  return null;
}

const getAutoSavedData = (lessonId: number | string): string | null =>
  sessionStorage.getItem(`lesson-draft-${lessonId}`);

const isSerializedDocument = (value: unknown): value is SerializedDocument =>
  Boolean(value && typeof value === "object" && "editorState" in value && "lastSaved" in value);
