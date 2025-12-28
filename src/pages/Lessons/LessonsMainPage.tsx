import type {lessonObject} from "../../types/lessonTypes.ts";
import {LessonItem} from "../../components/lessons/LessonItem.tsx";
import "../../styles/pages/Lessons/LessonsMainPage.css";

const mockLessons: lessonObject[] = [
  // { id: 1, title: 'Урок 1: Введение в программирование' },
  // { id: 2, title: 'Урок 2: Основы JavaScript' },
  // { id: 3, title: 'Урок 3: Работа с DOM' },
]

export default function LessonsMainPage() {
  const lessons = mockLessons; // TODO: Замените на реальный источник данных
  const handleEdit = (id: number | string) => {
    console.log(`Редактирование урока с id: ${id}`);
  }

  return (
    <div className='lessons-main-page'>
      <header>
        <h1>Мои уроки</h1>
      </header>
      <main>
        {
          lessons.length === 0
            ? ( <span className='placeholderText'>У Вас пока нет уроков. Добавим парочку?</span> )
            : ( lessons.map( (lesson) => {
                return (
                  <LessonItem
                      id={lesson.id}
                      title={lesson.title}
                      isEditable={true}
                      handleEdit={handleEdit}
                  />
                );
              })
              )
        }
        <button className="create-lesson-button" aria-label="Создать новый урок">
          Создать урок
        </button>
      </main>
    </div>
  )
}
