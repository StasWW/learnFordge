import { useEffect, useLayoutEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'learnforge-theme';

const getInitialTheme = (): { theme: Theme; explicit: boolean } => {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return { theme: storedTheme, explicit: true };
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return { theme: prefersDark ? 'dark' : 'light', explicit: false };
};

const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute('data-theme', theme);
};

export default function ThemeToggle() {
  const [{ theme, explicit }, setThemeState] = useState(getInitialTheme);

  useLayoutEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (explicit) {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } else {
      localStorage.removeItem(THEME_STORAGE_KEY);
    }
  }, [theme, explicit]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (event: MediaQueryListEvent) => {
      setThemeState((current) => {
        if (current.explicit) {
          return current;
        }

        return { theme: event.matches ? 'dark' : 'light', explicit: false };
      });
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setThemeState((current) => ({
      theme: current.theme === 'dark' ? 'light' : 'dark',
      explicit: true,
    }));
  };

  const label = theme === 'dark' ? 'Светлая тема' : 'Тёмная тема';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Переключить на ${label.toLowerCase()}`}
    >
      <span className="theme-toggle__track" data-active={theme === 'dark'}>
        <span className="theme-toggle__thumb" />
      </span>
      <span className="theme-toggle__text">
        <span className="theme-toggle__label">{label}</span>
        <span className="theme-toggle__hint">
          {theme === 'dark' ? 'Сейчас тёмная' : 'Сейчас светлая'}
        </span>
      </span>
    </button>
  );
}
