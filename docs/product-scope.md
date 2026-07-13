# Product Scope — Commercial Platform V1

## Purpose

The platform sells and operates the Woo App Commercial Template Engine without exposing its private source repository. It must support both a downloadable software product and accompanied services.

## Primary audiences

### Entrepreneur / merchant

A person who wants to launch a WooCommerce shop quickly, with limited technical knowledge and a need for guidance.

### Technical customer

A developer or agency capable of installing a WordPress theme ZIP, configuring WooCommerce and applying manual updates.

### Internal operator

A team member who manages offers, payments, licenses, releases, onboarding projects and support.

## Commercial offers

### Starter

Autonomous product delivery:

- commercial license;
- protected theme ZIP download;
- installation documentation;
- manual update access according to the license terms;
- limited support.

The customer remains responsible for hosting, WordPress, WooCommerce configuration, backups and deployment.

### Pro

Accompanied launch:

- everything in Starter;
- onboarding questionnaire;
- initial theme installation;
- WooCommerce page configuration;
- staging setup when available;
- first visual validation;
- deployment after customer approval.

A Pro purchase creates both a software entitlement and a service request/project.

### Managed

Ongoing operations:

- planned updates;
- staging validation;
- backup before deployment;
- rollback support;
- corrections based on confirmed feedback;
- defined support level.

Managed may become recurring billing, but recurring payment implementation is not required until a compatible provider and commercial terms are approved.

## V1 customer journey

1. Discover the product and understand the difference between Starter, Pro and Managed.
2. View demonstrations for dropshipping, stock, hybrid and digital-product use cases.
3. Select an offer and begin checkout.
4. Complete payment through a hosted or provider-secured checkout.
5. The platform receives and verifies a signed webhook.
6. The platform creates or updates the customer, order, payment and entitlement.
7. The customer receives account access, order confirmation and the appropriate next action.
8. Starter customers can access protected downloads.
9. Pro and Managed customers also receive an onboarding workflow.

## V1 public website

Required areas:

- home;
- product overview;
- features;
- demonstrations;
- use cases / shop models;
- pricing;
- Starter, Pro and Managed detail pages;
- FAQ;
- contact;
- login and registration;
- legal placeholders for commercial license, terms, privacy and refunds.

The initial editorial language is French. Routing and content architecture must support English without a later URL migration.

## V1 customer account

Required foundations:

- profile and security settings;
- order history;
- entitlements;
- licenses and activation summary;
- protected downloads;
- release/version history available to the customer;
- Pro/Managed onboarding status;
- support request list and detail.

Sprint 01 only creates authenticated layout boundaries and domain foundations; it does not need to complete every screen.

## V1 administration

Required foundations:

- role-protected admin area;
- products, offers and prices;
- orders and payments;
- entitlements and licenses;
- releases and files;
- service requests/projects;
- support tickets;
- audit log.

Administrative actions that alter commercial access must be auditable.

## Licensing V1

V1 must support a simple internal license model:

- unique license key per entitlement or order item;
- status: active, suspended, expired or revoked;
- activation limit;
- activation records by normalized domain/installation identity;
- issue, activate, validate and deactivate operations;
- no permanent download URL in responses.

The first sprint defines the model and service contracts. Public WordPress update integration is a later sprint.

## Release delivery V1

The WordPress theme repository creates clean release ZIP artifacts. This platform stores only release metadata and private object-storage references.

Required controls:

- release version and changelog metadata;
- checksum and file size;
- entitlement verification before download;
- short-lived signed URL generation;
- download audit event;
- ability to disable a compromised release or file.

## Payment boundary

The application must not assume one payment provider. It needs a provider interface covering at least:

- checkout session creation;
- webhook verification and normalization;
- payment/refund event handling;
- optional customer portal capability.

A fake/local provider may be used for development. No real provider secret belongs in Git.

## Explicitly outside V1

- template marketplace;
- visual page builder;
- affiliate system;
- public API for third-party sellers;
- automatic production deployment to all customer sites;
- mobile applications;
- complete CRM;
- complex multi-organization tenancy;
- AI-generated shop creation;
- universal automatic WordPress updates before licensing and release flows are validated.

## V1 success criteria

The platform is considered commercially operable when:

- a visitor can understand and select an offer;
- a verified payment event creates a correct order and entitlement exactly once;
- an entitled customer can securely access the correct release;
- a license can be issued, validated, limited and revoked;
- Pro/Managed purchases create trackable onboarding work;
- operators can investigate commercial changes through audit records;
- core flows pass automated tests and production build validation.
