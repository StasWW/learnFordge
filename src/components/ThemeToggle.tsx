import { useEffect, useLayoutEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type ThemeMode = Theme | 'system';

const THEME_STORAGE_KEY = 'learnfordge-theme';
const LEGACY_THEME_STORAGE_KEY = 'learnforge-theme';
const LABEL_THEME = '\u0422\u0435\u043c\u0430';
const ARIA_LABEL = '\u041f\u0435\u0440\u0435\u043a\u043b\u044e\u0447\u0430\u0442\u0435\u043b\u044c \u0442\u0435\u043c\u044b';
const OPTION_LABELS: Record<ThemeMode, string> = {
  system: '\u0421\u0438\u0441\u0442\u0435\u043c\u043d\u0430\u044f',
  light: '\u0421\u0432\u0435\u0442\u043b\u0430\u044f',
  dark: '\u0422\u0451\u043c\u043d\u0430\u044f',
};

const getSystemTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const migrateLegacyTheme = (): Theme | null => {
  const legacy = localStorage.getItem(LEGACY_THEME_STORAGE_KEY);
  if (legacy === 'light' || legacy === 'dark') {
    localStorage.setItem(THEME_STORAGE_KEY, legacy);
    localStorage.removeItem(LEGACY_THEME_STORAGE_KEY);
    return legacy;
  }
  return null;
};

const getInitialTheme = (): { theme: Theme; mode: ThemeMode } => {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return { theme: storedTheme, mode: storedTheme };
  }

  if (storedTheme === 'system') {
    return { theme: getSystemTheme(), mode: 'system' };
  }

  const legacyTheme = migrateLegacyTheme();
  if (legacyTheme) {
    return { theme: legacyTheme, mode: legacyTheme };
  }

  return { theme: getSystemTheme(), mode: 'system' };
};

const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute('data-theme', theme);
};

export default function ThemeToggle() {
  const selectId = 'theme-select';
  const [{ theme, mode }, setThemeState] = useState(getInitialTheme);

  useLayoutEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (mode === 'system') {
      localStorage.setItem(THEME_STORAGE_KEY, 'system');
      const systemTheme = getSystemTheme();
      if (systemTheme !== theme) {
        setThemeState({ theme: systemTheme, mode: 'system' });
      }
      return;
    }

    localStorage.setItem(THEME_STORAGE_KEY, mode);
  }, [mode, theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (event: MediaQueryListEvent) => {
      setThemeState((current) => {
        if (current.mode !== 'system') {
          return current;
        }
        return { theme: event.matches ? 'dark' : 'light', mode: 'system' };
      });
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleModeChange = (value: ThemeMode) => {
    if (value === 'system') {
      setThemeState({ theme: getSystemTheme(), mode: 'system' });
      return;
    }
    setThemeState({ theme: value, mode: value });
  };

  return (
    <div className="theme-toggle">
      <label className="theme-toggle__label" htmlFor={selectId}>
        <span className="theme-toggle__dot" aria-hidden />
        {LABEL_THEME}
      </label>
      <div className="theme-toggle__select-wrap">
        <select
          className="theme-toggle__select"
          id={selectId}
          value={mode}
          onChange={(e) => handleModeChange(e.target.value as ThemeMode)}
          aria-label={ARIA_LABEL}
        >
          <option value="system">{OPTION_LABELS.system}</option>
          <option value="light">{OPTION_LABELS.light}</option>
          <option value="dark">{OPTION_LABELS.dark}</option>
        </select>
      </div>
    </div>
  );
}
