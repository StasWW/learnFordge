// import {LexicalComposer} from "@lexical/react/LexicalComposer";
// import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
// import {LexicalErrorBoundary} from "@lexical/react/LexicalErrorBoundary";
// import {HistoryPlugin} from "@lexical/react/LexicalHistoryPlugin";
// import {ContentEditable} from "@lexical/react/LexicalContentEditable";
// import {AutoFocusPlugin} from "@lexical/react/LexicalAutoFocusPlugin";
//
//
// export default function TextEditor () {
//   const initialConfig = {
//     namespace: 'PostEditor',
//     onError: (error: Error) => console.warn(error)
//   }
//
//   return (
//     <LexicalComposer initialConfig={initialConfig}>
//       <RichTextPlugin
//         contentEditable={<ContentEditable className="editor-input" />}
//         ErrorBoundary={LexicalErrorBoundary}
//       />
//       <AutoFocusPlugin />
//       <HistoryPlugin />
//     </LexicalComposer>
//   )
// }

import Quill from "quill";

export default function TextEditor() {
  const quill = new Quill('.editor-input', {
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['image', 'code-block'],
      ],
    },
    placeholder: 'Compose an epic...',
    theme: 'snow', // or 'bubble'
  })

  return (
    <div className='text-editor'>

    </div>
  )
}