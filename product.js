const params = new URLSearchParams(window.location.search);
const listing = window.marketplaceListings.find((item) => item.id === params.get('id')) || window.marketplaceListings[0];
const detail = document.getElementById('product-detail');

detail.innerHTML = `
  <div class="product-detail-visual ${listing.visual}"><span>Listing template</span></div>
  <div class="product-detail-copy">
    <p class="eyebrow">${listing.category}</p>
    <h1>${listing.name}</h1>
    <p class="detail-type">${listing.type}</p>
    <p class="detail-description">${listing.description}</p>
    <dl class="listing-details">
      <div><dt>Equipment brand</dt><dd>Visible when a supplier publishes the listing</dd></div>
      <div><dt>Supplier profile</dt><dd>Anonymous until the Buy Now contact flow</dd></div>
      <div><dt>Reputation</dt><dd>Verified profile required before publishing</dd></div>
      <div><dt>Price</dt><dd>Published by the seller when the listing goes live</dd></div>
    </dl>
    <h2>Core capabilities</h2>
    <ul class="capability-list">${listing.capabilities.map((item) => `<li>${item}</li>`).join('')}</ul>
  </div>`;

document.getElementById('buy-now').addEventListener('click', () => {
  window.location.href = `buy.html?id=${encodeURIComponent(listing.id)}`;
});

document.getElementById('save-favorite').addEventListener('click', () => {
  const state = JSON.parse(localStorage.getItem('bcglobal-demo-state') || '{"favorites":[]}');
  state.favorites = state.favorites || [];
  if (!state.favorites.some((item) => item.id === listing.id)) {
    state.favorites.push({ id: listing.id, name: listing.name });
    localStorage.setItem('bcglobal-demo-state', JSON.stringify(state));
  }
  const note = document.getElementById('buy-now-note');
  note.textContent = 'Saved to local demo favorites. Buyer accounts will store this data securely in production.';
  note.hidden = false;
});
