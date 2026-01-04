import { useState, useCallback } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 'formats',
    question: 'Живые уроки или записи?',
    answer: 'Поддерживаем оба. Ведите live-сессии с чатом, плюс сохраняем записи автоматически, чтобы ученики смотрели в удобное время.',
  },
  {
    id: 'tests',
    question: 'Как работают тесты и проверки?',
    answer: 'Есть вопросы с выбором, вводом текста и соответствием. Автопроверка сразу подсвечивает результаты и прогресс.',
  },
  {
    id: 'payments',
    question: 'Оплата и доступ к курсам?',
    answer: 'Принимаем разовые платежи и подписки. После оплаты ученик видит курс в личном кабинете, доступ можно ограничить по времени.',
  },
  {
    id: 'support',
    question: 'Что с поддержкой и онбордингом?',
    answer: '24/7 чат и email. Помогаем перенести контент и настроить расписание — без сложных интеграций.',
  },
  {
    id: 'mobile',
    question: 'Адаптация под мобильные?',
    answer: 'Интерфейс оптимизирован под телефон и планшет: уроки, видео и тесты работают без ограничений.',
  },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = useCallback((id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleItem(id);
    }
  }, [toggleItem]);

  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-heading">
      <div className="faq-container">
        <header className="faq-header">
          <span className="section-kicker">FAQ</span>
          <h2 id="faq-heading">Вопросы и ответы</h2>
          <p>Ответы на самые частые вопросы о платформе</p>
        </header>
        <div className="faq-list" role="list">
          {faqData.map((item) => {
            const isOpen = openItems.has(item.id);
            return (
              <div 
                key={item.id} 
                className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
                role="listitem"
              >
                <button
                  className="faq-question"
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  onKeyDown={(e) => handleKeyDown(e, item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <div className="faq-question-text">
                    <span className="faq-prefix" aria-hidden="true">Q</span>
                    <span>{item.question}</span>
                  </div>
                  <svg 
                    className="faq-chevron" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div 
                  id={`faq-answer-${item.id}`}
                  className="faq-answer"
                  role="region"
                  aria-hidden={!isOpen}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
