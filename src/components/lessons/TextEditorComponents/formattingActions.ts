import {
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  type LexicalEditor,
  type TextFormatType,
  type ElementFormatType,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
} from "lexical";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import {
  $createHeadingNode,
  $createQuoteNode,
} from "@lexical/rich-text";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { $wrapNodes } from "@lexical/selection";

export default function formatText(editor: LexicalEditor, event: string) {
  const insertLink = () => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://");
  };

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        $wrapNodes(selection, () => $createParagraphNode());
      }
    });
  };

  const formatLargeHeading = () => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        $wrapNodes(selection, () => $createHeadingNode("h1"));
      }
    });
  };

  const formatSmallHeading = () => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        $wrapNodes(selection, () => $createHeadingNode("h2"));
      }
    });
  };

  const formatBulletList = () => {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  };

  const formatNumberedList = () => {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
  };

  const formatQuote = () => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        $wrapNodes(selection, () => $createQuoteNode());
      }
    });
  };

  const formatTextCommands = new Set(["bold", "underline", "strikethrough",
    "italic", "highlight", "code", "subscript",
    "superscript", "lowercase", "uppercase", "capitalize"]);
  const alignCommands = new Set(['left', 'right', 'center', 'start', 'end', 'justify']);

  if (event === 'undo') {
    editor.dispatchCommand(UNDO_COMMAND, undefined);
  } else if (event === 'redo') {
    editor.dispatchCommand(REDO_COMMAND, undefined);
  } else if (formatTextCommands.has(event)) {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, event as TextFormatType);
  } else if (alignCommands.has(event)) {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, event as ElementFormatType);
  } else if (event === 'paragraph') {
    formatParagraph();
  } else if (event === 'h1') {
    formatLargeHeading();
  } else if (event === 'h2') {
    formatSmallHeading();
  } else if (event === 'ul') {
    formatBulletList();
  } else if (event === 'ol') {
    formatNumberedList();
  } else if (event === 'quote') {
    formatQuote();
  } else if (event === 'link') {
    insertLink();
  }
}
