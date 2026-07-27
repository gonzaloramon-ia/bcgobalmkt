const buyParams = new URLSearchParams(window.location.search);
const buyListing = window.marketplaceListings.find((item) => item.id === buyParams.get('id')) || window.marketplaceListings[0];
const buyCard = document.getElementById('buy-card');

buyCard.innerHTML = `
  <p class="eyebrow">Equipment inquiry</p>
  <h1>${buyListing.name}</h1>
  <p class="buy-lead">Send a structured inquiry. BillCounter Global will route it to a suitable verified supplier as listings become available. No payment is collected here.</p>
  <div class="buy-steps"><div><b>1</b><strong>Describe your need</strong><span>Include quantity, market and relevant specifications.</span></div><div><b>2</b><strong>Supplier route</strong><span>Your inquiry is matched with an appropriate supplier.</span></div><div><b>3</b><strong>Arrange directly</strong><span>Buyer and seller agree payment and delivery terms.</span></div></div>
  <form id="purchase-intent-form" class="stack-form buy-form">
    <label>Contact name<input name="name" required autocomplete="name" placeholder="Your name"></label>
    <label>Company<input name="company" autocomplete="organization" placeholder="Company name"></label>
    <label>Business email<input type="email" name="email" required autocomplete="email" placeholder="you@company.com"></label>
    <label>Market<select name="market"><option>United States</option><option>United Kingdom</option><option>France</option><option>Japan</option><option>Argentina</option><option>Worldwide / Other Market</option></select></label>
    <label>Estimated quantity<input type="number" name="quantity" min="1" value="1"></label>
    <label>Requirements<textarea name="message" rows="5" required placeholder="Currency, capacity, detection, delivery market or other requirements."></textarea></label>
    <label class="consent-field"><input type="checkbox" required> I agree that my inquiry may be shared with a suitable verified supplier.</label>
    <button class="primary-button" type="submit">Send equipment inquiry <span>›</span></button>
  </form>
  <p class="form-help">This opens your email application with the inquiry prefilled. You can review it before sending.</p>
  <p class="form-result" id="purchase-result" hidden></p>`;

document.getElementById('purchase-intent-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  const state = JSON.parse(localStorage.getItem('bcglobal-state') || '{"inquiries":[]}');
  state.inquiries = state.inquiries || [];
  state.inquiries.push({ listingId: buyListing.id, market: data.market, createdAt: new Date().toISOString() });
  localStorage.setItem('bcglobal-state', JSON.stringify(state));
  const subject = `BillCounter Global inquiry — ${buyListing.name}`;
  const body = [
    `Equipment: ${buyListing.name}`,
    `Category: ${buyListing.category}`,
    `Contact: ${data.name}`,
    `Company: ${data.company || 'Not provided'}`,
    `Business email: ${data.email}`,
    `Market: ${data.market}`,
    `Estimated quantity: ${data.quantity || '1'}`,
    '',
    'Requirements:',
    data.message,
    '',
    `Listing: ${window.location.origin}${window.location.pathname.replace('buy.html', 'product.html')}?id=${encodeURIComponent(buyListing.id)}`
  ].join('\n');
  const result = document.getElementById('purchase-result');
  result.innerHTML = `Your email application should open now. If it does not, write to <a href="mailto:billcounter.srl@gmail.com">billcounter.srl@gmail.com</a>.`;
  result.hidden = false;
  window.location.href = `mailto:billcounter.srl@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
