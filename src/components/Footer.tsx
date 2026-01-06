import ThemeToggle from './ThemeToggle';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="footer-shell">
        <div className="footer-meta">
          <span className="footer-brand">© {year} · learnFordge</span>
        </div>
        <div className="footer-actions">
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
