EXFACTO FRAGRANCES — HYBRID QUIET-LUXURY STOREFRONT
==================================================

WHAT'S INCLUDED
- Multi-page brand website: Home, Shop, Our Story, Contact, Bag and Checkout.
- Merged visual direction: the editorial, premium multi-page identity from the supplied site plus the cleaner product-card / quick-shopping approach from the earlier prototype.
- Shop by audience: All, For Him, For Her and Unisex.
- Live search across fragrance name, description, category, notes and tags.
- Sort by featured, price and name.
- Homepage search shortcut and direct links to each audience collection.
- Product detail pop-up, add-to-bag actions, persistent browser cart, quantity changes and removal.
- Checkout order-enquiry form that can prepare a WhatsApp message after the business number is configured.
- Responsive layouts and mobile navigation.

HOW TO PREVIEW
1. Extract this ZIP folder.
2. Open exfacto_fragrances/index.html in a modern browser.
3. Open Shop to try search, gender filters, sorting and add-to-bag.
4. Add products to the bag, then test the checkout form.

IMPORTANT BEFORE GOING LIVE
- Product names, prices, descriptions, sizes, scent notes and images are demo catalogue content. Confirm and replace these with the actual Exfacto inventory.
- Prices are sample ZAR amounts and are not confirmed business prices.
- Product photos and Google Fonts load from external services; internet access is needed.
- The bag is stored in the visitor's browser using localStorage.
- Checkout does NOT collect card details or process payment. It creates a WhatsApp order enquiry only after a real WhatsApp number is configured. The store must confirm availability, shipping and payment.
- To activate WhatsApp order enquiries, open js/config.js and set whatsappNumber to the confirmed international number using digits only, e.g. 27XXXXXXXXX.
- To activate the contact email link, set contactEmail in js/config.js.
- Instagram and TikTok URLs are present in the footer; confirm that they are the correct official business profiles.
- Before launch, add a real payment provider and secure server-side order handling, privacy policy, terms, delivery and returns information.

EDITING PRODUCTS
Open js/config.js. Each product has:
id, name, category (men / women / unisex), description, size, price, image, tag and notes.
Use unique IDs and numeric prices in South African Rand.


OFFICIAL BRAND LOGO
The supplied Exfacto logo is saved at assets/exfacto-logo.webp and is used in the header and footer across all pages. Replace this file to update the logo site-wide (keep the same filename).


LOGO PRESENTATION UPDATE
The official logo is now cropped to its artwork and integrated directly into the site masthead with a larger, balanced footprint. The old background plaque has been removed; the header has a subtle champagne-gold top rule and warm-ivory finish so the logo feels native to the design. Mobile sizing is adjusted to prevent overlap with the hero section.
