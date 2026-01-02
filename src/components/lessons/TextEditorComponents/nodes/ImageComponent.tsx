import React, {useRef, useState, useCallback, useEffect, type JSX} from "react";
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
import { $isImageNode, RESIZE_IMAGE_COMMAND } from "./ImageNode";
import "../../../../styles/pages/Lessons/components/imageNode.css";

interface ImageComponentProps {
  src: string;
  altText: string;
  width?: number;
  height?: number;
  nodeKey: NodeKey;
}

export default function ImageComponent({
  src,
  altText,
  width,
  height,
  nodeKey,
}: ImageComponentProps): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const imageRef = useRef<HTMLImageElement>(null);
  const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(nodeKey);
  const [isResizing, setIsResizing] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(width);
  const [currentHeight, setCurrentHeight] = useState(height);

  const onDelete = useCallback(
    (event: KeyboardEvent) => {
      if (isSelected && $isNodeSelection($getSelection())) {
        event.preventDefault();
        editor.update(() => {
          const node = $getNodeByKey(nodeKey);
          if ($isImageNode(node)) {
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
          if (imageRef.current && imageRef.current.contains(event.target as Node)) {
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

  const handleResizeStart = useCallback(
    (e: React.MouseEvent, direction: string) => {
      e.preventDefault();
      e.stopPropagation();
      setIsResizing(true);

      const startX = e.clientX;
      const startY = e.clientY;
      const startWidth = currentWidth || imageRef.current?.naturalWidth || 200;
      const startHeight = currentHeight || imageRef.current?.naturalHeight || 200;
      const aspectRatio = startWidth / startHeight;

      let newWidth = startWidth;
      let newHeight = startHeight;

      const onMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.clientX - startX;
        const deltaY = moveEvent.clientY - startY;

        newWidth = startWidth;
        newHeight = startHeight;

        if (direction.includes("e")) {
          newWidth = Math.max(50, startWidth + deltaX);
        }
        if (direction.includes("w")) {
          newWidth = Math.max(50, startWidth - deltaX);
        }
        if (direction.includes("s")) {
          newHeight = Math.max(50, startHeight + deltaY);
        }
        if (direction.includes("n")) {
          newHeight = Math.max(50, startHeight - deltaY);
        }

        // Maintain aspect ratio for corner handles
        if (direction.length === 2) {
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            newHeight = newWidth / aspectRatio;
          } else {
            newWidth = newHeight * aspectRatio;
          }
        }

        setCurrentWidth(Math.round(newWidth));
        setCurrentHeight(Math.round(newHeight));
      };

      const onMouseUp = () => {
        setIsResizing(false);
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);

        // Dispatch resize command so it can be undone
        editor.dispatchCommand(RESIZE_IMAGE_COMMAND, {
          nodeKey,
          width: Math.round(newWidth),
          height: Math.round(newHeight),
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [currentWidth, currentHeight, editor, nodeKey]
  );

  useEffect(() => {
    setCurrentWidth(width);
    setCurrentHeight(height);
  }, [width, height]);

  const style: React.CSSProperties = {
    width: currentWidth ? `${currentWidth}px` : undefined,
    height: currentHeight ? `${currentHeight}px` : undefined,
    maxWidth: "100%",
  };

  return (
    <div
      className={`image-wrapper ${isSelected ? "selected" : ""} ${isResizing ? "resizing" : ""}`}
      draggable={!isResizing}
    >
      <img
        ref={imageRef}
        src={src}
        alt={altText}
        style={style}
        draggable="false"
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
