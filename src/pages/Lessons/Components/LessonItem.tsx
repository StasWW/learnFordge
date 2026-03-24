import type {lessonCompactObject} from "../../../types/lessonTypes.ts";
import Button from "../../../assets/CommonComponents/Button.tsx";
import IconButton from "../../../assets/CommonComponents/IconButton.tsx";
import LessonItemIcon from "../../../assets/images/LessonItemIcon.tsx";
import EditIcon from "../../../assets/images/commonIcons/EditIcon.tsx";
import MoreVerticalIcon from "../../../assets/images/commonIcons/MoreVerticalIcon.tsx";
import TrashIcon from "../../../assets/images/commonIcons/TrashIcon.tsx";
import "../../../styles/pages/Lessons/components/lessonItem.css";
import {useEffect, useRef, useState, type MouseEvent as ReactMouseEvent} from "react";

export function LessonItem(
  { id,
    title,
    isEditable,
    handleEdit,
    handleClick,
  }: lessonCompactObject &
    {
      isEditable?: boolean,
      handleEdit: (id: number | string, title: string) => void,
      handleClick: (id: number | string, title: string) => void,
    }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const handleOutsideClick = (event: globalThis.MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <div
      className={`lesson-item${menuOpen ? ' menu-open' : ''}`}
      key={id}
      onClick={() => handleClick(id, title)}
    >
      <LessonItemIcon size={28} color="var(--accent)" />
      <span>{title}</span>
      {isEditable && (
        <>
          <div className='controls'>
            <IconButton
              className="edit-lesson-button"
              aria-label={`Редактировать ${title}`}
              icon={<EditIcon size={18} aria-hidden="true" />}
              onClick={(event: ReactMouseEvent<HTMLButtonElement>) => {
                event.stopPropagation();
                handleEdit(id, title);
              }}
            />
            <IconButton
              className="delete-lesson-button"
              aria-label={`Удалить ${title}`}
              icon={<TrashIcon size={18} aria-hidden="true" />}
              onClick={(event: ReactMouseEvent<HTMLButtonElement>) => {
                event.stopPropagation();
              }}
            />
          </div>
          <div
            className="lesson-item-menu"
            ref={menuRef}
            onClick={(event) => event.stopPropagation()}
          >
            <IconButton
              className="menu-trigger"
              aria-label={`Открыть меню для ${title}`}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              icon={<MoreVerticalIcon size={18} aria-hidden="true" />}
              onClick={(event) => {
                event.stopPropagation();
                setMenuOpen((prev) => !prev);
              }}
            />
            {menuOpen && (
              <div className="menu-popover" role="menu">
                <Button
                  className="menu-item edit-lesson-button"
                  role="menuitem"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleEdit(id, title);
                    setMenuOpen(false);
                  }}
                >
                  Редактировать
                </Button>
                <Button
                  className="menu-item delete-lesson-button"
                  role="menuitem"
                  onClick={(event) => {
                    event.stopPropagation();
                    setMenuOpen(false);
                  }}
                >
                  Удалить
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
