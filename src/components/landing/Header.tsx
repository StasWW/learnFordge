export default function Header() {
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

      </div>
    </header>
  );
}
