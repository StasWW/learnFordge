import {LexicalComposer} from "@lexical/react/LexicalComposer";
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import {LexicalErrorBoundary} from "@lexical/react/LexicalErrorBoundary";
import {HistoryPlugin} from "@lexical/react/LexicalHistoryPlugin";
import {ContentEditable} from "@lexical/react/LexicalContentEditable";
import {AutoFocusPlugin} from "@lexical/react/LexicalAutoFocusPlugin";
import {ListPlugin} from "@lexical/react/LexicalListPlugin";
import {LinkPlugin} from "@lexical/react/LexicalLinkPlugin";
import {HeadingNode, QuoteNode} from "@lexical/rich-text";
import {ListNode, ListItemNode} from "@lexical/list";
import {LinkNode, AutoLinkNode} from "@lexical/link";
import {CodeNode} from "@lexical/code";
import Toolbar from "./TextEditorComponents/Toolbar.tsx";
import lexicalEditorTheme from "./TextEditorComponents/lexicalEditorTheme.ts";
import '../../styles/pages/Lessons/components/lexicalEditorTheme.css'
import { ImageNode } from "../../nodes/ImageNode";

export default function TextEditor () {
  const initialConfig = {
    namespace: 'PostEditor',
    theme: lexicalEditorTheme,
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      LinkNode,
      AutoLinkNode,
      CodeNode,
      ImageNode,
    ],
    onError: (error: Error) => console.warn(error)
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Toolbar />
      <RichTextPlugin
        contentEditable={<ContentEditable className="editor-input" />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <AutoFocusPlugin />
      <HistoryPlugin />
      <ListPlugin />
      <LinkPlugin />
    </LexicalComposer>
  )
}
