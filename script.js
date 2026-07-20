const byId = (id) => document.getElementById(id);

byId('favorites-toggle').addEventListener('click', () => {
  const feedback = byId('search-feedback');
  feedback.textContent = 'Favorites will be available when buyer accounts are enabled.';
});

const worldwideToggle = byId('worldwide-toggle');
const worldwideList = byId('worldwide-list');
const marketsToggle = byId('markets-toggle');
const marketsList = byId('other-markets-list');

function toggleList(target, other) {
  target.hidden = !target.hidden;
  other.hidden = true;
}
worldwideToggle.addEventListener('click', () => toggleList(worldwideList, marketsList));
marketsToggle.addEventListener('click', () => toggleList(marketsList, worldwideList));

const supplierToggle = byId('supplier-form-toggle');
const supplierForm = byId('supplier-form');
supplierToggle.addEventListener('click', () => {
  supplierForm.hidden = !supplierForm.hidden;
  if (!supplierForm.hidden) supplierForm.querySelector('input').focus();
});
supplierForm.addEventListener('submit', (event) => {
  event.preventDefault();
  byId('supplier-feedback').textContent = 'Supplier request saved for review. We will contact you when supplier onboarding is enabled.';
});

byId('market-search').addEventListener('submit', (event) => {
  event.preventDefault();
  const term = byId('equipment-search').value.trim();
  const category = byId('category-search').value;
  const feedback = byId('search-feedback');
  if (!term && !category) {
    feedback.textContent = 'Choose a category or enter an equipment, brand or supplier.';
    return;
  }
  feedback.textContent = `Marketplace search ready: ${term || category}. Product listings will appear here as suppliers join.`;
  byId('marketplace').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.querySelectorAll('[data-category]').forEach((link) => {
  link.addEventListener('click', () => {
    const category = link.dataset.category;
    byId('equipment-search').value = category;
    byId('search-feedback').textContent = `${category}: category selected. Listings will appear as the marketplace catalogue is populated.`;
  });
});
