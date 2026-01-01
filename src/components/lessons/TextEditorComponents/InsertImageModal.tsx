import {Modal} from "../../common/Modal.tsx";
import {useState} from "react";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {$getSelection, $insertNodes, $isRangeSelection} from "lexical";
import {$createImageNode} from "../../../nodes/ImageNode";

export default function InsertImageModal({onClose}: {onClose: () => void}) {
  const [editor] = useLexicalComposerContext();
  const [imageUrl, setImageUrl] = useState("");

  const handleInsert = () => {
    if (!imageUrl.trim()) return;

    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const imageNode = $createImageNode({ src: imageUrl, altText: "Image" });
        $insertNodes([imageNode]);
      }
    });

    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <p>Вставьте изображение</p>
      <input
        placeholder='Вставьте сюда ссылку'
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button onClick={handleInsert}>Вставить</button>
      <p>-или-</p>
      <div onClick={() => {}}>
        <span>Перетащите сюда файл</span>
      </div>
    </Modal>
  );
}