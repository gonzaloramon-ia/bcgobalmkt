const buyParams = new URLSearchParams(window.location.search);
const buyListing = window.marketplaceListings.find((item) => item.id === buyParams.get('id')) || window.marketplaceListings[0];
const buyCard = document.getElementById('buy-card');

buyCard.innerHTML = `
  <p class="eyebrow">Buy Now flow</p>
  <h1>${buyListing.name}</h1>
  <p class="buy-lead">For a live verified listing, this step gives the buyer the seller’s business contact details. Payment and delivery are then arranged directly with that seller.</p>
  <div class="buy-steps"><div><b>1</b><strong>Choose equipment</strong><span>Buyer selects a published listing.</span></div><div><b>2</b><strong>Confirm purchase intent</strong><span>The marketplace records the event for reporting and reputation.</span></div><div><b>3</b><strong>Contact seller directly</strong><span>Seller contact is revealed only to the buyer.</span></div></div>
  <form id="purchase-intent-form" class="stack-form buy-form"><label>Business email<input type="email" name="email" required placeholder="you@company.com"></label><label>Market<select name="market"><option>United States</option><option>United Kingdom</option><option>France</option><option>Japan</option><option>Argentina</option><option>Other Market</option></select></label><label>Message for seller<textarea name="message" rows="4" placeholder="Tell the seller what you need."></textarea></label><button class="primary-button" type="submit">Confirm purchase intent <span>›</span></button></form><p class="form-result" id="purchase-result" hidden></p>`;

document.getElementById('purchase-intent-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const state = JSON.parse(localStorage.getItem('bcglobal-demo-state') || '{"purchaseIntents":[]}');
  state.purchaseIntents = state.purchaseIntents || [];
  state.purchaseIntents.push({ listingId: buyListing.id, createdAt: new Date().toISOString() });
  localStorage.setItem('bcglobal-demo-state', JSON.stringify(state));
  const result = document.getElementById('purchase-result');
  result.textContent = 'This is a listing template, so no seller contact exists yet. For a live verified listing, this exact action would reveal the seller’s details to the buyer.';
  result.hidden = false;
});
