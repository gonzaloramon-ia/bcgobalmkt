(() => {
  const key = 'bcglobal-theme';
  const media = window.matchMedia('(prefers-color-scheme: dark)');

  function preferredTheme() {
    const saved = localStorage.getItem(key);
    return saved === 'light' || saved === 'dark' ? saved : (media.matches ? 'dark' : 'light');
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#091523' : '#f5fbff';
    const button = document.querySelector('[data-theme-toggle]');
    if (button) {
      const dark = theme === 'dark';
      button.setAttribute('aria-pressed', String(dark));
      button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      button.title = dark ? 'Light mode' : 'Dark mode';
      button.innerHTML = dark ? '☀' : '☾';
    }
  }

  applyTheme(preferredTheme());

  document.addEventListener('DOMContentLoaded', () => {
    let tools = document.querySelector('.header-tools');
    if (!tools) {
      const header = document.querySelector('.header-inner');
      if (!header) return;
      tools = document.createElement('div');
      tools.className = 'header-tools theme-tools';
      header.append(tools);
    }

    const button = document.createElement('button');
    button.className = 'icon-control theme-toggle';
    button.type = 'button';
    button.dataset.themeToggle = '';
    button.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem(key, next);
      applyTheme(next);
    });
    tools.prepend(button);
    applyTheme(document.documentElement.dataset.theme);
  });
})();
