import FormatText from "../../../assets/images/toolbarIcons/file-earmark-text.svg";
import FormatHeader1 from "../../../assets/images/toolbarIcons/type-h1.svg";
import FormatHeader2 from "../../../assets/images/toolbarIcons/type-h2.svg";
import FormatListNumberedIcon from "../../../assets/images/toolbarIcons/list-ol.svg";
import FormatListBulletedIcon from "../../../assets/images/toolbarIcons/list-ul.svg";
import FormatQuoteIcon from "../../../assets/images/toolbarIcons/chat-square-quote.svg";
import CodeIcon from "../../../assets/images/toolbarIcons/journal-code.svg";
import RedoOutlinedIcon from "../../../assets/images/toolbarIcons/arrow-clockwise.svg";
import UndoOutlinedIcon from "../../../assets/images/toolbarIcons/arrow-counterclockwise.svg";
import FormatBoldOutlinedIcon from "../../../assets/images/toolbarIcons/type-bold.svg";
import FormatItalicOutlinedIcon from "../../../assets/images/toolbarIcons/type-italic.svg";
import FormatUnderlinedOutlinedIcon from "../../../assets/images/toolbarIcons/type-underline.svg";
import StrikethroughSOutlinedIcon from "../../../assets/images/toolbarIcons/type-strikethrough.svg";
import ImageIcon from "../../../assets/images/toolbarIcons/file-image.svg";
import InsertLinkOutlinedIcon from "../../../assets/images/toolbarIcons/link.svg";
import FormatAlignLeftOutlinedIcon from "../../../assets/images/toolbarIcons/text-left.svg";
import FormatAlignJustifyOutlinedIcon from "../../../assets/images/toolbarIcons/text-center.svg";
import FormatAlignRightOutlinedIcon from "../../../assets/images/toolbarIcons/text-right.svg";

import type {PluginItem} from "../../../types/lessonTypes.ts";

export const eventTypes = {
  paragraph: "paragraph",
  h1: "h1",
  h2: "h2",
  ul: "ul",
  ol: "ol",
  quote: "quote",
  formatCode: "code",
  formatUndo: "undo",
  formatRedo: "redo",
  formatBold: "bold",
  formatItalic: "italic",
  formatUnderline: "underline",
  formatStrike: "strikethrough",
  formatInsertLink: "formatInsertLink",
  formatAlignLeft: "left",
  formatAlignCenter: "center",
  formatAlignRight: "right",
  insertImage: "insertImage",
};

const pluginsList: Record<string, PluginItem> = {
  redo: {
    icon: RedoOutlinedIcon,
    event: eventTypes.formatRedo,
    label: "Повторить",
  },
  undo: {
    icon: UndoOutlinedIcon,
    event: eventTypes.formatUndo,
    label: "Отменить",
  },
  paragraph: {
    icon: FormatText,
    event: eventTypes.paragraph,
    label: "Обычный текст",
  },
  h1: {
    icon: FormatHeader1,
    event: eventTypes.h1,
    label: "Заголовок 1",
  },
  h2: {
    icon: FormatHeader2,
    event: eventTypes.h2,
    label: "Заголовок 2",
  },
  bulletList: {
    icon: FormatListBulletedIcon,
    event: eventTypes.ul,
    label: "Маркированный список",
  },
  numberedList: {
    icon: FormatListNumberedIcon,
    event: eventTypes.ol,
    label: "Нумерованный список",
  },
  quote: {
    icon: FormatQuoteIcon,
    event: eventTypes.quote,
    label: "Цитата",
  },
  code: {
    icon: CodeIcon,
    event: eventTypes.formatCode,
    label: "Код",
  },
  bold: {
    icon: FormatBoldOutlinedIcon,
    event: eventTypes.formatBold,
    label: "Жирный",
  },
  italic: {
    icon: FormatItalicOutlinedIcon,
    event: eventTypes.formatItalic,
    label: "Курсив",
  },
  underline: {
    icon: FormatUnderlinedOutlinedIcon,
    event: eventTypes.formatUnderline,
    label: "Подчеркнутый",
  },
  strikethrough: {
    icon: StrikethroughSOutlinedIcon,
    event: eventTypes.formatStrike,
    label: "Зачеркнутый",
  },
  image: {
    icon: ImageIcon,
    event: eventTypes.insertImage,
    label: "Вставить изображение",
  },
  link: {
    icon: InsertLinkOutlinedIcon,
    event: eventTypes.formatInsertLink,
    label: "Вставить ссылку",
  },
  alignLeft: {
    icon: FormatAlignLeftOutlinedIcon,
    event: eventTypes.formatAlignLeft,
    label: "Выровнять по левому краю",
  },
  alignCenter: {
    icon: FormatAlignJustifyOutlinedIcon,
    event: eventTypes.formatAlignCenter,
    label: "Выровнять по центру",
  },
  alignRight: {
    icon: FormatAlignRightOutlinedIcon,
    event: eventTypes.formatAlignRight,
    label: "Выровнять по правому краю",
  },
};

export default pluginsList;
