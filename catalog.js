const params = new URLSearchParams(window.location.search);
const state = {
  category: params.get('category') || '',
  market: params.get('market') || '',
  query: params.get('q') || ''
};

const normalise = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const includesText = (listing, term) => {
  const haystack = [listing.name, listing.category, listing.type, listing.description, ...listing.capabilities].join(' ');
  return normalise(haystack).includes(normalise(term));
};

function listingCard(listing) {
  return `
    <article class="product-card">
      <a class="product-visual ${listing.visual}" href="product.html?id=${listing.id}" aria-label="Open ${listing.name}"><span>Listing template</span></a>
      <p class="product-category">${listing.category}</p>
      <h3><a href="product.html?id=${listing.id}">${listing.name}</a></h3>
      <p class="product-type">${listing.type}</p>
      <p class="product-description">${listing.description}</p>
      <div class="listing-meta"><span class="supplier-tier">Verified profile required</span><span>Price supplied by seller</span></div>
      <a class="product-action" href="product.html?id=${listing.id}">View listing template <b>›</b></a>
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

function render() {
  const query = document.getElementById('catalog-query').value.trim();
  const listings = window.marketplaceListings.filter((listing) => {
    const categoryMatches = !state.category || listing.category === state.category;
    const queryMatches = !query || includesText(listing, query);
    return categoryMatches && queryMatches;
  });
  const heading = document.getElementById('result-heading');
  const label = document.getElementById('result-label');
  const title = document.getElementById('catalog-title');
  const summary = document.getElementById('catalog-summary');
  const marketCopy = state.market ? ` · Market route: ${state.market}` : '';

  document.querySelectorAll('[data-category-filter]').forEach((link) => {
    link.classList.toggle('is-current', link.dataset.categoryFilter === state.category);
  });
  document.getElementById('catalog-query').value = state.query || query;
  title.textContent = state.category || 'Browse cash-handling equipment';
  summary.textContent = state.market
    ? `${state.market} market route selected. Supplier listings will appear after verification.`
    : 'Explore the product architecture for a marketplace dedicated exclusively to cash handling.';
  label.textContent = `Catalogue framework${marketCopy}`;
  heading.textContent = state.category ? `${state.category} listing templates` : 'Equipment listing templates';
  document.getElementById('result-count').textContent = `${listings.length} template${listings.length === 1 ? '' : 's'}`;
  document.getElementById('product-grid').innerHTML = listings.map(listingCard).join('');
  document.getElementById('empty-results').hidden = listings.length > 0;
}

document.getElementById('catalog-search').addEventListener('submit', (event) => {
  event.preventDefault();
  state.query = document.getElementById('catalog-query').value.trim();
  render();
});

renderCategoryMap();
render();
