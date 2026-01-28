import type {lessonCompactObject} from "../../../types/lessonTypes.ts";
import LessonItemIcon from "../../../assets/images/LessonItemIcon.tsx";
import "../../../styles/pages/Lessons/components/lessonItem.css";
import {useEffect, useRef, useState, type MouseEvent} from "react";

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

    const handleOutsideClick = (event: MouseEvent) => {
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
            <button
              className="edit-lesson-button"
              aria-label={`Редактировать ${title}`}
              onClick={(event: MouseEvent<HTMLButtonElement>) => {
                event.stopPropagation();
                handleEdit(id, title);
              }}>
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
            </button>
            <button className="delete-lesson-button" aria-label={`Удалить ${title}`} onClick={(event: MouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();
            }}>
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </button>
          </div>
          <div
            className="lesson-item-menu"
            ref={menuRef}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="menu-trigger"
              aria-label={`Открыть меню для ${title}`}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={(event) => {
                event.stopPropagation();
                setMenuOpen((prev) => !prev);
              }}
            >
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
              >
                <circle cx="12" cy="5" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="12" cy="19" r="2" />
              </svg>
            </button>
            {menuOpen && (
              <div className="menu-popover" role="menu">
                <button
                  className="menu-item edit-lesson-button"
                  role="menuitem"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleEdit(id, title);
                    setMenuOpen(false);
                  }}
                >
                  Редактировать
                </button>
                <button
                  className="menu-item delete-lesson-button"
                  role="menuitem"
                  onClick={(event) => {
                    event.stopPropagation();
                    setMenuOpen(false);
                  }}
                >
                  Удалить
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
