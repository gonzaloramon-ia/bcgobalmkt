# BillCounter Global Marketplace — MVP architecture

## Current static MVP routes

- `index.html` — marketplace home
- `catalog.html` — categories, market routes and listing templates
- `product.html` — equipment-type detail
- `buy.html` — structured buyer inquiry routed by email
- `buyer-dashboard.html` — local saved-equipment shortlist
- `supplier-onboarding.html` — supplier application through Google Forms
- `how-it-works.html` — marketplace and reputation model
- `about.html`, `terms.html`, `privacy.html` — information and policy pages

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

## Future backend phase

Add authentication, database tables, listing management, file uploads, audit logs, protected role permissions and email notifications when the supplier network justifies the operational complexity. Saved equipment can then migrate from browser-local storage to buyer accounts, and inquiries can be routed without relying on the buyer's email client.
