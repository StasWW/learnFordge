export default function Navbar() {
  return (
    <nav className="top-nav">
      <div className="nav-shell">
        <div className="nav-brand">learnFordge</div>
        <div className="nav-links" role="navigation" aria-label="Основная навигация">
          <a href="#home">Главная</a>
          <a href="#features">Возможности</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="nav-action">
          <button className="nav-login" type="button">Войти</button>
        </div>
      </div>
    </nav>
  );
}
