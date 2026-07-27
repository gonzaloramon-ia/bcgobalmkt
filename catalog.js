const params = new URLSearchParams(window.location.search);
const markets = [
  'USA', 'UK', 'France', 'Japan', 'Argentina', 'Worldwide',
  'Germany', 'Italy', 'Spain', 'Portugal', 'Netherlands', 'Belgium',
  'Switzerland', 'Sweden', 'Norway', 'Denmark', 'Poland', 'Turkey',
  'Mexico', 'Brazil', 'Chile', 'Colombia', 'Peru', 'Australia', 'South Korea', 'India'
];

const state = {
  category: params.get('category') || '',
  market: params.get('market') || '',
  query: params.get('q') || '',
  supplierCountry: params.get('supplierCountry') || '',
  shipsTo: params.get('shipsTo') || '',
  brand: params.get('brand') || '',
  reputation: params.get('reputation') || '',
  priceRange: params.get('priceRange') || ''
};

const normalise = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const includesText = (listing, term) => {
  const haystack = [listing.name, listing.category, listing.type, listing.description, ...listing.capabilities].join(' ');
  return normalise(haystack).includes(normalise(term));
};
const hasLiveListingFilters = () => Boolean(state.supplierCountry || state.shipsTo || state.brand || state.reputation || state.priceRange);

function listingCard(listing) {
  return `
    <article class="product-card">
      <a class="product-visual ${listing.visual}" href="product.html?id=${listing.id}" aria-label="Open ${listing.name}"><span>Equipment type</span></a>
      <p class="product-category">${listing.category}</p>
      <h3><a href="product.html?id=${listing.id}">${listing.name}</a></h3>
      <p class="product-type">${listing.type}</p>
      <p class="product-description">${listing.description}</p>
      <div class="listing-meta"><span class="supplier-tier">Verified suppliers only</span><span>Price and availability on live listings</span></div>
      <a class="product-action" href="product.html?id=${listing.id}">View equipment details <b>›</b></a>
    </article>`;
}

function renderCategoryMap() {
  const target = document.getElementById('category-map-grid');
  target.innerHTML = window.marketplaceCategories.map((category) => `
    <article>
      <h3>${category.name}</h3>
      <p>${category.description}</p>
      ${category.subcategories.length ? `<ul>${category.subcategories.map((item) => `<li>${item}</li>`).join('')}</ul>` : '<p class="map-simple">No subcategories at launch.</p>'}
      <a href="catalog.html?category=${encodeURIComponent(category.name)}">Browse category →</a>
    </article>`).join('');
}

function populateMarketFilters() {
  document.querySelectorAll('select[data-listing-filter="supplierCountry"], select[data-listing-filter="shipsTo"]').forEach((select) => {
    select.insertAdjacentHTML('beforeend', markets.map((market) => `<option value="${market}">${market}</option>`).join(''));
  });
}

function writeStateToUrl() {
  const next = new URLSearchParams();
  Object.entries(state).forEach(([key, value]) => {
    if (value) next.set(key, value);
  });
  const query = next.toString();
  window.history.replaceState({}, '', `${window.location.pathname}${query ? `?${query}` : ''}`);
}

function syncControls() {
  document.getElementById('catalog-query').value = state.query;
  document.querySelectorAll('[data-listing-filter]').forEach((control) => {
    control.value = state[control.dataset.listingFilter] || '';
  });
  document.getElementById('clear-listing-filters').hidden = !hasLiveListingFilters();
}

function render() {
  const query = document.getElementById('catalog-query').value.trim();
  state.query = query;
  const baseListings = window.marketplaceListings.filter((listing) => {
    const categoryMatches = !state.category || listing.category === state.category;
    const queryMatches = !query || includesText(listing, query);
    return categoryMatches && queryMatches;
  });
  const liveFilterApplied = hasLiveListingFilters();
  const listings = liveFilterApplied ? [] : baseListings;
  const heading = document.getElementById('result-heading');
  const label = document.getElementById('result-label');
  const title = document.getElementById('catalog-title');
  const summary = document.getElementById('catalog-summary');
  const marketCopy = state.market ? ` · Market route: ${state.market}` : '';
  const empty = document.getElementById('empty-results');
  const filterHelp = document.getElementById('listing-filter-help');

  document.querySelectorAll('[data-category-filter]').forEach((link) => {
    link.classList.toggle('is-current', link.dataset.categoryFilter === state.category);
  });
  title.textContent = state.category || 'Browse cash-handling equipment';
  summary.textContent = state.market
    ? `${state.market} market route selected. Supplier listings will appear after verification.`
    : 'Explore the product architecture for a marketplace dedicated exclusively to cash handling.';
  label.textContent = `Equipment catalogue${marketCopy}`;
  heading.textContent = state.category ? `${state.category} equipment types` : 'Equipment types';
  document.getElementById('result-count').textContent = liveFilterApplied
    ? '0 verified listings'
    : `${listings.length} equipment type${listings.length === 1 ? '' : 's'}`;
  document.getElementById('product-grid').innerHTML = listings.map(listingCard).join('');
  empty.hidden = listings.length > 0;
  empty.textContent = liveFilterApplied
    ? 'No verified supplier listings match these filters yet. Clear the listing filters to keep browsing equipment types.'
    : 'No equipment types match this search.';
  filterHelp.textContent = liveFilterApplied
    ? 'Filter applied. New verified listings will appear here as suppliers are approved.'
    : 'Use these filters on verified supplier listings as they are added.';
  syncControls();
  writeStateToUrl();
}

document.getElementById('catalog-search').addEventListener('submit', (event) => {
  event.preventDefault();
  render();
});

document.querySelectorAll('[data-listing-filter]').forEach((control) => {
  const applyFilter = () => {
    state[control.dataset.listingFilter] = control.value.trim();
    render();
  };
  control.addEventListener(control.tagName === 'INPUT' ? 'input' : 'change', applyFilter);
});

document.getElementById('clear-listing-filters').addEventListener('click', () => {
  ['supplierCountry', 'shipsTo', 'brand', 'reputation', 'priceRange'].forEach((key) => { state[key] = ''; });
  render();
});

populateMarketFilters();
renderCategoryMap();
render();
