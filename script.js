const byId = (id) => document.getElementById(id);

const worldwideToggle = byId('worldwide-toggle');
const worldwideList = byId('worldwide-list');
const marketsToggle = byId('markets-toggle');
const marketsList = byId('other-markets-list');

function toggleList(target, other, trigger, otherTrigger) {
  target.hidden = !target.hidden;
  other.hidden = true;
  trigger.setAttribute('aria-expanded', String(!target.hidden));
  otherTrigger?.setAttribute('aria-expanded', 'false');
}

if (worldwideToggle && worldwideList && marketsList) {
  worldwideToggle.addEventListener('click', () => toggleList(worldwideList, marketsList, worldwideToggle, marketsToggle));
}

if (marketsToggle && marketsList && worldwideList) {
  marketsToggle.addEventListener('click', () => toggleList(marketsList, worldwideList, marketsToggle, worldwideToggle));
}

const supplierToggle = byId('supplier-form-toggle');
const supplierForm = byId('supplier-form');
if (supplierToggle && supplierForm) {
  supplierToggle.addEventListener('click', () => {
    supplierForm.hidden = !supplierForm.hidden;
  });
}

const marketSearch = byId('market-search');
if (marketSearch) {
  marketSearch.addEventListener('submit', (event) => {
    const term = byId('equipment-search').value.trim();
    const category = byId('category-search').value;
    if (!term && !category) {
      event.preventDefault();
      byId('search-feedback').textContent = 'Enter an equipment, brand or supplier, or choose a category.';
    }
  });
}
