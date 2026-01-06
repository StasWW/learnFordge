import React, {useEffect, useRef, useCallback} from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection";
import { mergeRegister } from "@lexical/utils";
import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  type NodeKey,
} from "lexical";
// @ts-expect-error fuck ts
import Desmos from "desmos";
import { $isGraphNode, RESIZE_GRAPH_COMMAND } from "./graphNode.tsx";
import { useResizable } from "../../../../hooks/useResizable";

interface GraphComponentProps {
  width?: number;
  height?: number;
  nodeKey: NodeKey;
}

export default function GraphComponent({
  width,
  height,
  nodeKey,
}: GraphComponentProps) {
  const [editor] = useLexicalComposerContext();
  const graphRef = useRef<HTMLDivElement>(null);
  const calculatorRef = useRef<any>(null);
  const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(nodeKey);

  const { isResizing, currentWidth, currentHeight, handleResizeStart } = useResizable({
    nodeKey,
    width,
    height,
    elementRef: graphRef as React.RefObject<HTMLElement>,
    resizeCommand: RESIZE_GRAPH_COMMAND,
    maintainAspectRatio: false,
    minWidth: 200,
    minHeight: 150,
  });

  const onDelete = useCallback(
    (event: KeyboardEvent) => {
      if (isSelected && $isNodeSelection($getSelection())) {
        event.preventDefault();
        editor.update(() => {
          const node = $getNodeByKey(nodeKey);
          if ($isGraphNode(node)) {
            node.remove();
          }
        });
      }
      return false;
    },
    [editor, isSelected, nodeKey]
  );

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand<MouseEvent>(
        CLICK_COMMAND,
        (event) => {
          if (graphRef.current && graphRef.current.contains(event.target as Node)) {
            if (!event.shiftKey) {
              clearSelection();
            }
            setSelected(true);
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_DELETE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW
      )
    );
  }, [clearSelection, editor, onDelete, setSelected]);

  useEffect(() => {
    if (graphRef.current && !calculatorRef.current) {
      calculatorRef.current = Desmos.GraphingCalculator(graphRef.current);
      calculatorRef.current.setExpression({ id: "graph1", latex: "y=x^2" });
    }

    return () => {
      if (calculatorRef.current) {
        calculatorRef.current.destroy();
        calculatorRef.current = null;
      }
    };
  }, []);

  const style: React.CSSProperties = {
    width: currentWidth ? `${currentWidth}px` : "640px",
    height: currentHeight ? `${currentHeight}px` : "320px",
  };

  return (
    <div
      className={`graph-wrapper ${isSelected ? "selected" : ""} ${isResizing ? "resizing" : ""}`}
      draggable={!isResizing}
    >
      <div
        ref={graphRef}
        className="calculator-desmos"
        style={style}
      />
      {isSelected && (
        <>
          <div
            className="resize-handle nw"
            onMouseDown={(e) => handleResizeStart(e, "nw")}
          />
          <div
            className="resize-handle ne"
            onMouseDown={(e) => handleResizeStart(e, "ne")}
          />
          <div
            className="resize-handle sw"
            onMouseDown={(e) => handleResizeStart(e, "sw")}
          />
          <div
            className="resize-handle se"
            onMouseDown={(e) => handleResizeStart(e, "se")}
          />
          <div
            className="resize-handle n"
            onMouseDown={(e) => handleResizeStart(e, "n")}
          />
          <div
            className="resize-handle s"
            onMouseDown={(e) => handleResizeStart(e, "s")}
          />
          <div
            className="resize-handle e"
            onMouseDown={(e) => handleResizeStart(e, "e")}
          />
          <div
            className="resize-handle w"
            onMouseDown={(e) => handleResizeStart(e, "w")}
          />
        </>
      )}
    </div>
  );
}