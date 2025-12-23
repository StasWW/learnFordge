import {LexicalComposer} from "@lexical/react/LexicalComposer";
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import {LexicalErrorBoundary} from "@lexical/react/LexicalErrorBoundary";
import {HistoryPlugin} from "@lexical/react/LexicalHistoryPlugin";
import {ContentEditable} from "@lexical/react/LexicalContentEditable";
import {AutoFocusPlugin} from "@lexical/react/LexicalAutoFocusPlugin";


export default function TextEditor () {
  const initialConfig = {
    namespace: 'PostEditor',
    onError: (error: Error) => console.warn(error)
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={<ContentEditable className="editor-input" />}
        placeholder={<div>Enter some text...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <AutoFocusPlugin />
      <HistoryPlugin />
    </LexicalComposer>
  )
}