const params = new URLSearchParams(window.location.search);
const listing = window.marketplaceListings.find((item) => item.id === params.get('id')) || window.marketplaceListings[0];
const detail = document.getElementById('product-detail');

detail.innerHTML = `
  <div class="product-detail-visual ${listing.visual}"><span>Equipment type</span></div>
  <div class="product-detail-copy">
    <p class="eyebrow">${listing.category}</p>
    <h1>${listing.name}</h1>
    <p class="detail-type">${listing.type}</p>
    <p class="detail-description">${listing.description}</p>
    <dl class="listing-details">
      <div><dt>Equipment brand</dt><dd>Shown on approved supplier listings</dd></div>
      <div><dt>Supplier profile</dt><dd>Reviewed before publication</dd></div>
      <div><dt>Reputation</dt><dd>Based on verification and marketplace activity</dd></div>
      <div><dt>Price</dt><dd>Provided by the seller on a live listing</dd></div>
    </dl>
    <h2>Core capabilities</h2>
    <ul class="capability-list">${listing.capabilities.map((item) => `<li>${item}</li>`).join('')}</ul>
  </div>`;

document.getElementById('buy-now').addEventListener('click', () => {
  window.location.href = `buy.html?id=${encodeURIComponent(listing.id)}`;
});

document.getElementById('save-favorite').addEventListener('click', () => {
  const state = JSON.parse(localStorage.getItem('bcglobal-state') || '{"favorites":[]}');
  state.favorites = state.favorites || [];
  if (!state.favorites.some((item) => item.id === listing.id)) {
    state.favorites.push({ id: listing.id, name: listing.name });
    localStorage.setItem('bcglobal-state', JSON.stringify(state));
  }
  const note = document.getElementById('buy-now-note');
  note.textContent = 'Saved on this device. You can review it from Saved equipment.';
  note.hidden = false;
});
