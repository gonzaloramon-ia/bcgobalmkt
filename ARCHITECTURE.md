# BillCounter Global Marketplace — MVP architecture

## Front-end routes

- `index.html` — marketplace home
- `catalog.html` — categories, market routes and listing templates
- `product.html` — individual product listing template
- `buy.html` — purchase-intent / direct-contact flow
- `auth.html` — buyer and supplier entry point
- `buyer-dashboard.html` — favorites and buyer workspace
- `supplier-onboarding.html` — supplier verification application
- `supplier-dashboard.html` — listing-draft workspace
- `admin-dashboard.html` — internal supplier/listing review queue

## Production entities

1. **User**: buyer, supplier or administrator role.
2. **Supplier profile**: business identity, verification evidence, markets, shipping coverage and reputation tier.
3. **Listing**: product, category, brand, specifications, price policy, shipping coverage, supplier status and publication status.
4. **Purchase intent**: buyer, listing, timestamp, market and seller-contact release event.
5. **Transaction confirmation**: buyer and supplier confirmations, sale amount, commission status and dispute state.
6. **Reputation event**: verified purchase, delivery/quality feedback, cancellation/dispute and tier calculation.

## Critical business rules

- Listings are not public until the supplier and listing are approved.
- Supplier identity remains hidden in catalogue results unless the supplier elects to make its official brand public.
- `Buy Now` records a purchase intent, then releases seller contact details only to the buyer.
- Payment and delivery are agreed directly by buyer and seller in the initial model.
- Reputation derives from verified marketplace activity, not self-declared claims.
- Administrator actions require a protected role; the public prototype page is only a workflow model.

## Backend phase

Replace browser-local prototype storage with authentication, database tables, file uploads, audit logs, role permissions and email notifications. The current page flow is deliberately aligned with those entities so the interface does not need to be redesigned later.
