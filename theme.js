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
    document.querySelectorAll('[data-theme-choice]').forEach((button) => {
      const active = button.dataset.themeChoice === theme;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
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

    const control = document.createElement('div');
    control.className = 'theme-control';
    control.setAttribute('aria-label', 'Color theme');
    control.innerHTML = `
      <span class="theme-label">Theme</span>
      <button type="button" data-theme-choice="light" aria-label="Use light theme">☀ <span>Light</span></button>
      <button type="button" data-theme-choice="dark" aria-label="Use dark theme">☾ <span>Dark</span></button>`;
    control.querySelectorAll('[data-theme-choice]').forEach((button) => {
      button.addEventListener('click', () => {
        const next = button.dataset.themeChoice;
        localStorage.setItem(key, next);
        applyTheme(next);
      });
    });
    tools.prepend(control);
    applyTheme(document.documentElement.dataset.theme);
  });
})();
