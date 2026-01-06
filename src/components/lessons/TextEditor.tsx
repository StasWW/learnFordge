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
import Toolbar from "./TextEditorComponents/helperComponents/Toolbar.tsx";
import lexicalEditorTheme from "./TextEditorComponents/lexicalEditorTheme.ts";
import { ImageNode } from "./TextEditorComponents/nodes/ImageNode";
import ImagesPlugin from "./TextEditorComponents/plugins/ImagesPlugin.tsx";
import { GraphNode } from "./TextEditorComponents/nodes/graphNode.tsx";
import GraphPlugin from "./TextEditorComponents/plugins/GraphPlugin.tsx";
import { YouTubeNode } from "./TextEditorComponents/nodes/YoutubeNode.tsx";
import YouTubePlugin from "./TextEditorComponents/plugins/YoutubePlugin.tsx";
import '../../styles/pages/Lessons/components/lexicalEditorTheme.css';
// import {OnChangePlugin} from "@lexical/react/LexicalOnChangePlugin";
// import {useRef} from "react";
// import type {EditorState} from "lexical";

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
      GraphNode,
      YouTubeNode,
    ],
    onError: (error: Error) => console.warn(error),
  }

  // const editorStateRef = useRef<EditorState | null>(null);
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Toolbar />

      <RichTextPlugin
        contentEditable={<ContentEditable className="editor-input" />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      {/*<OnChangePlugin onChange={editorState => editorStateRef.current = editorState} />*/}
      <AutoFocusPlugin />
      <HistoryPlugin />
      <ListPlugin />
      <LinkPlugin />
      <ImagesPlugin />
      <GraphPlugin />
      <YouTubePlugin />
    </LexicalComposer>
  )
}
