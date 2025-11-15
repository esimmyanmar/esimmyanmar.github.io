Power Pages deployment plan for eSIM Myanmar Entertainment Server

Scope
- 100 Power Pages (public marketing, customer portal, partner portal, admin, compliance)
- Dataverse-backed content (read-only public for marketing; authenticated for customer and admin portals)
- Microsoft-only implementation: Power Pages, Dataverse, Power Automate, Power Virtual Agents, Copilot Studio

Page groups
- 1-30 Public marketing: home, about, coverage, speed-test, tv, movies, games, features, news, blog, media-kit, press, case-studies, gallery, flyer, brochure, whitepaper, reports, investors, careers, contact, sitemap, accessibility, privacy, terms, gdpr, legal-notices, roadmap, innovation, sustainability
- 31-60 Customer portal (requires Entra ID): login, onboarding, device activation, QR activation, usage dashboard, data packs, top-up, billing history, top-up history, device list, transfer, migration, troubleshooting, chat support, tickets, notifications, subscription management, settings, user profile, security center, consent management
- 61-80 Partner portal: partner onboarding, affiliate dashboard, reseller portal, partner API docs, integration guides, partner resources, partner reporting, SLA management, connector configuration, partner billing, training materials
- 81-95 Admin portal: user management, entitlement server dashboard, eSIM inventory, provisioning queue, audit logs, system alerts, analytics, payment reconciliation, content management, release management, feature flags
- 96-100 Compliance: privacy center, DSR (data subject request) intake, GDPR portal, audit reports, terms of service

Dataverse usage
- Dataverse will host read-only content for public pages (content pages, media assets, region maps)
- Customer, partner, and admin portals use authenticated tables with role-based access in Entra ID and Power Pages table permissions
- Proposed table groups: Content, Media, Regions, Devices, Users, Entitlements, Orders, Payments, Partners, Logs, Alerts, Sessions, Translations, Topics, FAQs, Events, Pages

Deliverables in repository
- `dataverse_tables_manifest.json`: canonical list of Dataverse tables and descriptions (72 table stubs)
- `POWERPAGES_PLAN.md`: this file (page map and deployment notes)
- `POWERPLATFORM_DEPLOY.md`: (next step) CI artifacts and pac CLI export instructions

Provisioning notes
- Power Pages and Dataverse resources must be provisioned in the tenant using Power Platform admin center or `pac` CLI.
- Use environment-specific solutions and ALM pipelines to export/import page templates and site templates from development to production.
- Grant least-privilege permission sets for Power Pages site makers and admins.

Security and access
- Public pages: anonymous read-only access via Power Pages site setting; content published from Dataverse via site mapping
- Customer/partner/admin pages: Entra ID authentication with Conditional Access and MFA required; role-based permissions using Dataverse table permissions
- Backend APIs: hosted in Azure Functions with Private Endpoint and IP allowlist (Myanmar, Singapore, Japan) for management-only access

Notes
- This plan documents page mapping and Dataverse usage. Creating Power Pages site artifacts, Power Apps portal files, and exportable solutions is a separate ALM task. Use Power Platform CLI (`pac`) and GitHub Actions to export/import site solutions.
