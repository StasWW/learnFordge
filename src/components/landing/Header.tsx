import { useEffect, useState } from 'react';
import type { ChangeEvent, JSX } from 'react';

export default function Header() {
  type ToggleKey = 'mic' | 'timer' | 'lofi' | 'screen';
  const [toggles, setToggles] = useState<Record<ToggleKey, boolean>>({
    mic: true,
    timer: true,
    lofi: false,
    screen: false,
  });
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [focusMinutes, setFocusMinutes] = useState(25);

  useEffect(() => {
    const stepMs = 1400;
    const id = window.setInterval(() => {
      if (isPaused) return;
      setProgress((prev) => (prev + 1) % 6);
    }, stepMs);
    return () => window.clearInterval(id);
  }, [isPaused]);

  const togglePause = () => setIsPaused((prev) => !prev);
  const toggleControl = (key: ToggleKey) =>
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  const handleFocusChange = (event: ChangeEvent<HTMLInputElement>) =>
    setFocusMinutes(Number(event.target.value));

  const ticks = Array.from({ length: 6 });
  const controlItems: { key: ToggleKey; label: string; icon: JSX.Element }[] = [
    {
      key: 'mic',
      label: 'mic',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
          <path d="M5 10v1a7 7 0 0 0 14 0v-1" />
          <line x1="12" y1="19" x2="12" y2="22" />
          <line x1="8" y1="22" x2="16" y2="22" />
        </svg>
      ),
    },
    {
      key: 'timer',
      label: 'timer',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="13" r="7" />
          <polyline points="12 10 12 13 15 13" />
          <line x1="10" y1="2" x2="14" y2="2" />
        </svg>
      ),
    },
    {
      key: 'lofi',
      label: 'lofi',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="5 3 19 12 5 21 5 3" />
          <line x1="12" y1="7" x2="12" y2="17" />
        </svg>
      ),
    },
    {
      key: 'screen',
      label: 'screen',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="12" rx="2" ry="2" />
          <line x1="8" y1="20" x2="16" y2="20" />
          <line x1="12" y1="16" x2="12" y2="20" />
        </svg>
      ),
    },
  ];

  return (
    <header className="hero">
      <div className="hero-glow hero-glow-left" aria-hidden="true" />
      <div className="hero-glow hero-glow-right" aria-hidden="true" />
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="company-name">LearnForge</h1>
          <p className="slogan">Чистый интерфейс для видеозвонков, уроков и тестов</p>
          <div className="hero-actions">
            <div className="cta-buttons">
              <button className="btn-primary" type="button">
                Начать бесплатно
              </button>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="dashboard-preview">
            <div className="preview-card video-card">
              <div className="badge-row">
                <span className="pill live-pill">Live</span>
                <span className="pill ghost-pill">Фокус {focusMinutes} мин</span>
                <button
                  type="button"
                  className="round-icon-btn"
                  aria-label={isPaused ? 'Возобновить анимацию' : 'Поставить на паузу'}
                  onClick={togglePause}
                >
                  {isPaused ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  )}
                </button>
              </div>
              <div className={`control-pad ${isPaused ? 'is-paused' : ''}`} aria-label="Панель live управления">
                <div className="control-grid">
                  {controlItems.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      className={`control-toggle ${toggles[item.key] ? 'is-on' : ''}`}
                      aria-pressed={toggles[item.key]}
                      onClick={() => toggleControl(item.key)}
                    >
                      <span className="toggle-icon" aria-hidden="true">{item.icon}</span>
                      <span className="control-label">{item.label}</span>
                    </button>
                  ))}
                </div>
                <div className="control-slider" aria-label="Настройка времени фокуса">
                  <div className="slider-head">
                    <span className="slider-label">focus</span>
                    <span className="slider-value">{focusMinutes} мин</span>
                  </div>
                  <div className="slider-body">
                    <div
                      className="slider-fill"
                      style={{ width: `${((focusMinutes - 15) / 35) * 100}%` }}
                      aria-hidden="true"
                    />
                    <input
                      className="slider-input"
                      type="range"
                      min="15"
                      max="50"
                      step="1"
                      value={focusMinutes}
                      onChange={handleFocusChange}
                      aria-valuemin={15}
                      aria-valuemax={50}
                      aria-valuenow={focusMinutes}
                    />
                  </div>
                  <div className="live-timeline" aria-hidden="true">
                    {ticks.map((_, index) => (
                      <span key={index} className={`tick ${index <= progress ? 'active' : ''}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="preview-aurora" aria-hidden="true" />
          </div>
        </div>
      </div>
    </header>
  );
}
