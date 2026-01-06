import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { COMMAND_PRIORITY_LOW, $getNodeByKey } from "lexical";
import { RESIZE_GRAPH_COMMAND, $isGraphNode } from "../nodes/graphNode.tsx";

export default function GraphPlugin(): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      RESIZE_GRAPH_COMMAND,
      (payload) => {
        const { nodeKey, width, height } = payload;
        editor.update(() => {
          const node = $getNodeByKey(nodeKey);
          if ($isGraphNode(node)) {
            node.setWidth(width);
            node.setHeight(height);
          }
        });
        return true;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor]);

  return null;
}

