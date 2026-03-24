import {useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import TextEditor from "./Components/TextEditor.tsx";
import IconButton from "../../assets/CommonComponents/IconButton.tsx";
import ChevronIcon from "../../assets/images/commonIcons/ChevronIcon.tsx";
import '../../styles/pages/Lessons/LessonIdPage.css';
import type {viewLessonProps} from "../../types/lessonTypes.ts";
import {Suspense, useMemo, type CSSProperties} from "react";

export default function LessonIdPage() {
  // TODO: Добавить проверку на существование lessonId
  // TODO: Добавить проверку на возможность редактирования урока
  // TODO: Добавить подгрузку данных урока по lessonId
  const { id: paramId } = useParams<{id: string}>();
  const locationState = useLocation()?.state as viewLessonProps | null;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isEditMode = searchParams.get('edit') === 'true';

  const id = locationState?.id ?? paramId;
  const title = locationState?.title ?? 'Loading...';

  const editorStatePromise = useMemo(() => Promise.resolve(undefined), []);

  return (
    <div className='lesson-id-page'>
      <div className="lesson-header">
        <IconButton
          type="button"
          className="lesson-back-button"
          aria-label="Назад"
          icon={<ChevronIcon className="lesson-back-icon" direction="left" aria-hidden="true" />}
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate('/Lessons');
            }
          }}
        />
        <h1
          className={`lesson-name ${isEditMode ? 'editable' : ''}`}
          contentEditable={isEditMode}
        >{title}</h1>
        <span className="lesson-header-spacer" aria-hidden="true" />
      </div>
      <Suspense fallback={<SkeletonBox />}>
        <TextEditor
          isEditMode={isEditMode}
          id={id!}
          editorStatePromise={editorStatePromise}
        />
      </Suspense>
    </div>
  )
}

function SkeletonBox() {
  const lines = [
    { width: '52%', height: '1.5rem', margin: '0.8rem auto 0.2rem' },
    { width: '70%', height: '1rem' },
    { width: '100%', height: '1rem' },
    { width: '95%', height: '1rem' },
    { width: '100%', height: '1rem' },
    { width: '85%', height: '1rem' },
    { width: '44%', height: '1.2rem', margin: '1.8rem auto 0.6rem' },
    { width: '100%', height: '1rem' },
    { width: '100%', height: '1rem' },
    { width: '92%', height: '1rem' },
    { width: '88%', height: '1rem' },
    { width: '100%', height: '1rem' },
    { width: '97%', height: '1rem' },
  ];

  return (
    <div className="editor-input lesson-editor-skeleton" aria-hidden="true">
      {lines.map((line, index) => (
        <div
          key={`${line.width}-${index}`}
          className="skeleton-animation lesson-editor-skeleton__line"
          style={{
            width: line.width,
            height: line.height,
            margin: line.margin,
            '--skeleton-delay': `${index * 0.08}s`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}
