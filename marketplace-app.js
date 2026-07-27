const BCGlobal = {
  key: 'bcglobal-state',
  read() {
    try {
      return JSON.parse(localStorage.getItem(this.key)) || { favorites: [], inquiries: [] };
    } catch {
      return { favorites: [], inquiries: [] };
    }
  },
  write(state) {
    localStorage.setItem(this.key, JSON.stringify(state));
  },
  notice(target, message) {
    if (!target) return;
    target.textContent = message;
    target.hidden = false;
  }
};

function renderBuyerDashboard() {
  const favoritesTarget = document.getElementById('favorite-list');
  if (!favoritesTarget) return;
  const state = BCGlobal.read();
  favoritesTarget.innerHTML = state.favorites.length
    ? state.favorites.map((item) => `<li><a href="product.html?id=${encodeURIComponent(item.id)}">${item.name}</a><button data-remove-favorite="${item.id}" type="button">Remove</button></li>`).join('')
    : '<li class="empty-line">No saved equipment yet. Use “Save” on any listing to build a shortlist.</li>';
  favoritesTarget.querySelectorAll('[data-remove-favorite]').forEach((button) => {
    button.addEventListener('click', () => {
      const updated = BCGlobal.read();
      updated.favorites = updated.favorites.filter((item) => item.id !== button.dataset.removeFavorite);
      BCGlobal.write(updated);
      renderBuyerDashboard();
    });
  });
}

renderBuyerDashboard();
