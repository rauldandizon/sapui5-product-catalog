# Products — Freestyle SAPUI5 App

A small Fiori-style product catalog built from scratch to learn freestyle SAPUI5: MVC, data binding, routing, filtering, fragments, i18n, and a real OData V2 service.

Browse a product list backed by the public [Northwind OData service](https://services.odata.org/V2/Northwind/Northwind.svc/), search/filter it, and drill into a detail page with a stock-details dialog.

## Features

- **MVC architecture** — XML views, JS controllers, wired through a `UIComponent` + `manifest.json`
- **Data binding** — property, aggregation (list), and element (detail page) binding against a live OData model
- **Client-side routing** — hash-based navigation between a list and a detail view, driven entirely by `manifest.json`
- **Filtering** — search box filters the list binding (including a search that reaches through an OData navigation property)
- **Fragments** — a reusable stock-details dialog, loaded once and cached
- **i18n** — all UI text sourced from a `ResourceModel` / `.properties` bundle
- **Real OData V2 backend** — Northwind's public demo service, including a local dev proxy to work around CORS

## Tech stack

- [SAPUI5](https://ui5.sap.com/) (`sap.m` library, loaded from the SAP CDN)
- [UI5 Tooling](https://sap.github.io/ui5-tooling/) (`@ui5/cli`) for the local dev server
- [ui5-middleware-simpleproxy](https://www.npmjs.com/package/ui5-middleware-simpleproxy) to proxy OData requests around browser CORS restrictions

No build step, no bundler, no framework beyond UI5 itself — everything loads as AMD modules (`sap.ui.define`) straight from source.

## Getting started

**Prerequisites:** Node.js (for UI5 Tooling and the proxy middleware).

```bash
npm install
npx ui5 serve
```

Then open the URL UI5 Tooling prints (defaults to `http://localhost:8080/index.html`).

> Running via a plain static server (e.g. `http-server`, `python -m http.server`) will **not** work past the OData stage — the CORS workaround only exists inside the UI5 Tooling dev server, configured in `ui5.yaml`. Use `npx ui5 serve`.

## Project structure

```
webapp/
├── index.html                        # Bootstraps UI5, mounts the Component
├── Component.js                      # App entry point — reads manifest.json, starts routing
├── manifest.json                     # App descriptor: models, routing, data source, dependencies
├── i18n/
│   └── i18n.properties                # All UI text, one key=value per line
├── view/
│   ├── App.view.xml                  # Empty shell — router swaps pages into this
│   ├── List.view.xml                 # Product list + search
│   ├── Detail.view.xml               # Single product's details
│   └── ProductDialog.fragment.xml    # Reusable "stock details" dialog
└── controller/
    ├── List.controller.js            # List search + navigation to Detail
    └── Detail.controller.js          # Loads one product by route param, opens the dialog
```

## Why there's a proxy in `ui5.yaml`

The Northwind demo service doesn't send CORS headers, so the browser blocks direct requests to it from `localhost`. `ui5-middleware-simpleproxy` runs inside the local dev server and forwards `/odata/*` requests to `https://services.odata.org` **server-to-server** — CORS only restricts browser-initiated cross-origin calls, so routing the request through the dev server sidesteps it entirely. `manifest.json`'s `mainService.uri` points at the local `/odata/...` path, not the real remote URL, for this reason.

## What this project demonstrates

A complete, working SAPUI5 application covering the core skills a Fiori developer needs day to day: MVC architecture, all three binding types (property, aggregation, and element binding), declarative client-side routing, search filtering — including filtering through an OData navigation property — reusable UI fragments, i18n, and integration with a real OData V2 backend. That last piece meant working through real-world OData quirks beyond the basics: canonical entity-key URLs (`/Products(1)`, not array-index paths), filtering across a navigation property (`Category/CategoryName`), and setting up a local CORS proxy for cross-origin OData access.
