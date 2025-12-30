import type { ComponentType, JSX } from 'react';
import type { IconProps } from '../../types/landingTypes';

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: ComponentType<IconProps>;
}

// Простые SVG иконки inline
const VideoIcon = ({ size = 24 }: IconProps): JSX.Element => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

const BookIcon = ({ size = 24 }: IconProps): JSX.Element => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const CheckSquareIcon = ({ size = 24 }: IconProps): JSX.Element => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 11 12 14 22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);

const UserIcon = ({ size = 24 }: IconProps): JSX.Element => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CreditCardIcon = ({ size = 24 }: IconProps): JSX.Element => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const BarChartIcon = ({ size = 24 }: IconProps): JSX.Element => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);

const BellIcon = ({ size = 24 }: IconProps): JSX.Element => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const LayoutIcon = ({ size = 24 }: IconProps): JSX.Element => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
);

const featuresData: FeatureItem[] = [
  {
    id: 'video',
    title: 'Видеозвонки и расписание',
    description: 'Проводите уроки в реальном времени с встроенными видеоконференциями и удобным расписанием.',
    icon: VideoIcon,
  },
  {
    id: 'lessons',
    title: 'Уроки и домашние задания',
    description: 'Создавайте интерактивные уроки с текстом, видео и заданиями для самостоятельной работы.',
    icon: BookIcon,
  },
  {
    id: 'tests',
    title: 'Тесты и автопроверка',
    description: 'Добавляйте тесты с автоматической проверкой и мгновенной обратной связью для учеников.',
    icon: CheckSquareIcon,
  },
  {
    id: 'cabinet',
    title: 'Личный кабинет ученика',
    description: 'Каждый ученик получает удобный кабинет с прогрессом, расписанием и материалами.',
    icon: UserIcon,
  },
  {
    id: 'payments',
    title: 'Платежи и подписки',
    description: 'Принимайте оплату за курсы, настраивайте подписки и управляйте финансами.',
    icon: CreditCardIcon,
  },
  {
    id: 'analytics',
    title: 'Аналитика прогресса',
    description: 'Отслеживайте успеваемость учеников с детальными отчётами и графиками.',
    icon: BarChartIcon,
  },
  {
    id: 'notifications',
    title: 'Уведомления и напоминания',
    description: 'Автоматические напоминания о занятиях, дедлайнах и новых материалах.',
    icon: BellIcon,
  },
  {
    id: 'constructor',
    title: 'Конструктор курсов',
    description: 'Гибкий редактор для создания курсов любой сложности без навыков программирования.',
    icon: LayoutIcon,
  },
];

export default function Features() {
  return (
    <section className="features-section" aria-labelledby="features-heading">
      <div className="features-container">
        <header className="features-header">
          <h2 id="features-heading">Всё для вашей онлайн-школы</h2>
          <p>Полный набор инструментов для создания, управления и масштабирования образовательного бизнеса</p>
        </header>
        <div className="features-grid">
          {featuresData.map((feature) => (
            <article key={feature.id} className="feature-card">
              <div className="feature-icon">
                <feature.icon size={28} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
