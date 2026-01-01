import pluginsList from "./toolbarButtons.ts";
import '../../../styles/pages/Lessons/components/textEditor.css';
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import DefaultButton from "./ToolbarDefaultButton.tsx";
import Dropdown from "./ToolbarDropdown.tsx";
import formatText from "./formattingActions.ts";
import {useCallback, useEffect, useState} from "react";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  type RangeSelection,
} from "lexical";
import {$isLinkNode} from "@lexical/link";
import {$isAtNodeEnd} from "@lexical/selection";
import {$getNearestNodeOfType} from "@lexical/utils";
import {$isListNode, ListNode} from "@lexical/list";
import {$isHeadingNode} from "@lexical/rich-text";
import InsertImageModal from "./InsertImageModal.tsx";

export default function Toolbar() {
  const [editor] = useLexicalComposerContext();
  const plugins = pluginsList;

  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [blockType, setBlockType] = useState("paragraph");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const handlePluginClick = (event: string) => {
    formatText(editor, event, () => setIsImageModalOpen(true));
  }

  const updateToolbar = useCallback(() => {
    function getSelectedNode(selection: RangeSelection) {
      const anchor = selection.anchor;
      const focus = selection.focus;
      const anchorNode = selection.anchor.getNode();
      const focusNode = selection.focus.getNode();
      if (anchorNode === focusNode) {
        return anchorNode;
      }
      const isBackward = selection.isBackward();
      if (isBackward) {
        return $isAtNodeEnd(focus) ? anchorNode : focusNode;
      } else {
        return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
      }
    }


    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));

      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getListType() : element.getListType();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          setBlockType(type);
        }
      }
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({editorState}) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        1
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        1
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        1
      )
    );
  }, [editor, updateToolbar]);

  return (
    <>
      <div className="toolbar">
        <DefaultButton button={plugins.undo} action={handlePluginClick} disabled={!canUndo}/>
        <DefaultButton button={plugins.redo} action={handlePluginClick} disabled={!canRedo}/>
        <Dropdown buttons={[plugins.paragraph, plugins.h1, plugins.h2]} action={handlePluginClick} selected={blockType}/>
        <DefaultButton button={plugins.bulletList} action={handlePluginClick} active={blockType === "ul"}/>
        <DefaultButton button={plugins.numberedList} action={handlePluginClick} active={blockType === "ol"}/>
        <DefaultButton button={plugins.quote} action={handlePluginClick} active={blockType === "quote"}/>
        <DefaultButton button={plugins.code} action={handlePluginClick}/> {/* FIXME: Fix a bug, add active property */}
        <DefaultButton button={plugins.bold} action={handlePluginClick} active={isBold}/>
        <DefaultButton button={plugins.italic} action={handlePluginClick} active={isItalic}/>
        <DefaultButton button={plugins.underline} action={handlePluginClick} active={isUnderline}/>
        <DefaultButton button={plugins.strikethrough} action={handlePluginClick} active={isStrikethrough}/>
        <DefaultButton button={plugins.link} action={handlePluginClick} active={isLink}/>
        <Dropdown buttons={[plugins.alignLeft, plugins.alignCenter, plugins.alignRight]} action={handlePluginClick}/>
        <DefaultButton button={plugins.image} action={handlePluginClick}/>
      </div>
      {isImageModalOpen && (
        <InsertImageModal
          onClose={() => setIsImageModalOpen(false)}
        />
      )}
    </>
  )
}
