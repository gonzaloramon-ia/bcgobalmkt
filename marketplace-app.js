const BCGlobal = {
  key: 'bcglobal-demo-state',
  read() {
    try {
      return JSON.parse(localStorage.getItem(this.key)) || { account: null, supplierApplication: null, listings: [], favorites: [], purchaseIntents: [] };
    } catch {
      return { account: null, supplierApplication: null, listings: [], favorites: [], purchaseIntents: [] };
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

const authForm = document.getElementById('account-form');
if (authForm) {
  authForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(authForm);
    const state = BCGlobal.read();
    state.account = { name: data.get('name'), email: data.get('email'), role: data.get('role') || 'buyer' };
    BCGlobal.write(state);
    window.location.href = state.account.role === 'supplier' ? 'supplier-onboarding.html' : 'buyer-dashboard.html';
  });
}

const supplierApplication = document.getElementById('supplier-application');
if (supplierApplication) {
  supplierApplication.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(supplierApplication).entries());
    const state = BCGlobal.read();
    state.supplierApplication = { ...data, status: 'review', createdAt: new Date().toISOString() };
    state.account = { name: data.contactName, email: data.email, role: 'supplier' };
    BCGlobal.write(state);
    BCGlobal.notice(document.getElementById('application-result'), 'Application saved in this prototype. In production it enters the supplier-verification queue.');
  });
}

const supplierListingForm = document.getElementById('supplier-listing-form');
if (supplierListingForm) {
  supplierListingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(supplierListingForm).entries());
    const state = BCGlobal.read();
    state.listings.push({ ...data, id: `draft-${Date.now()}`, status: 'pending-review' });
    BCGlobal.write(state);
    supplierListingForm.reset();
    renderSupplierListings();
    BCGlobal.notice(document.getElementById('listing-result'), 'Draft saved. It will remain unpublished until the supplier profile and listing are approved.');
  });
}

function renderSupplierListings() {
  const target = document.getElementById('supplier-listings');
  if (!target) return;
  const listings = BCGlobal.read().listings;
  target.innerHTML = listings.length
    ? listings.map((listing) => `<li><strong>${listing.name}</strong><span>${listing.category} · Pending review</span></li>`).join('')
    : '<li class="empty-line">No drafts yet.</li>';
}

function renderBuyerDashboard() {
  const accountTarget = document.getElementById('buyer-account-name');
  const favoritesTarget = document.getElementById('favorite-list');
  if (!accountTarget && !favoritesTarget) return;
  const state = BCGlobal.read();
  if (accountTarget) accountTarget.textContent = state.account?.name || 'Buyer account';
  if (favoritesTarget) {
    favoritesTarget.innerHTML = state.favorites.length
      ? state.favorites.map((item) => `<li><a href="product.html?id=${encodeURIComponent(item.id)}">${item.name}</a><button data-remove-favorite="${item.id}" type="button">Remove</button></li>`).join('')
      : '<li class="empty-line">No favorites yet. Save equipment to compare it later.</li>';
    favoritesTarget.querySelectorAll('[data-remove-favorite]').forEach((button) => {
      button.addEventListener('click', () => {
        const updated = BCGlobal.read();
        updated.favorites = updated.favorites.filter((item) => item.id !== button.dataset.removeFavorite);
        BCGlobal.write(updated);
        renderBuyerDashboard();
      });
    });
  }
}

function renderAdminQueue() {
  const supplierTarget = document.getElementById('admin-supplier-queue');
  const listingTarget = document.getElementById('admin-listing-queue');
  if (!supplierTarget && !listingTarget) return;
  const state = BCGlobal.read();
  if (supplierTarget) {
    supplierTarget.innerHTML = state.supplierApplication
      ? `<li><strong>${state.supplierApplication.company}</strong><span>${state.supplierApplication.primaryMarket} · Profile review pending</span></li>`
      : '<li class="empty-line">No supplier applications yet.</li>';
  }
  if (listingTarget) {
    listingTarget.innerHTML = state.listings.length
      ? state.listings.map((listing) => `<li><strong>${listing.name}</strong><span>${listing.category} · Pending listing review</span></li>`).join('')
      : '<li class="empty-line">No listing drafts yet.</li>';
  }
}

function renderAccountState() {
  const target = document.getElementById('account-state');
  if (!target) return;
  const account = BCGlobal.read().account;
  target.textContent = account ? `${account.name} · ${account.role}` : 'No local demo account';
}

renderSupplierListings();
renderBuyerDashboard();
renderAdminQueue();
renderAccountState();
