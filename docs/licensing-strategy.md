# Licensing Strategy — Legal, Commercial and Technical Layers

## Purpose

Define how Template Engine Platform sells and operates a WordPress/WooCommerce theme without confusing copyright licensing, commercial access, technical license keys, support and managed services.

This document is a product and engineering strategy. It is not a final legal instrument. Binding terms must be reviewed by qualified counsel before launch.

## Core principle

The licensing model has four separate layers:

1. **Software copyright license** — governs the rights attached to the distributed WordPress theme code.
2. **Commercial access agreement** — governs access to official downloads, updates, support and services sold by the business.
3. **Technical entitlement and license key** — enforces access to official platform services and approved activation limits.
4. **Service terms** — define Starter, Pro and Managed responsibilities, timelines and support boundaries.

These layers must never be merged into one vague “license”.

## 1. Software copyright license

### Target position

The WordPress/WooCommerce theme code should be distributed under a GPL-compatible license, with the initial target being:

```text
GNU General Public License v2.0 or later
```

The final release package must include the complete license text and an explicit notice identifying which files are covered.

### Consequences

The commercial platform may charge for providing the official package, updates, support, onboarding and maintenance. It must not represent the GPL-covered code as proprietary software whose recipients are forbidden to inspect, modify or redistribute it.

Technical license enforcement must therefore control official services rather than attempt to revoke GPL rights.

### Release-package files

Every commercial theme ZIP should contain at least:

```text
LICENSE.txt
COPYRIGHT.md
THIRD_PARTY_NOTICES.md
README.md
QUICKSTART.md
CHANGELOG.md
```

Recommended notices:

- copyright holder and years;
- project name and version;
- explicit GPL version statement;
- third-party package names, versions and licenses;
- asset/font/image licensing notices;
- trademark notice where applicable.

### Third-party audit

Before release, audit:

- PHP dependencies;
- JavaScript packages included in the distributed artifact;
- fonts;
- icons;
- photographs and illustration assets;
- demo content;
- WooCommerce/WordPress code copied or adapted;
- build artifacts that may embed third-party code.

A dependency or asset with incompatible redistribution terms blocks release until replaced or separately licensed.

## 2. Commercial access agreement

The customer purchase grants commercial access to official business services. It does not replace the software copyright license.

The agreement may define:

- access to official release downloads;
- update-access duration;
- support duration and channels;
- number of supported production installations;
- staging/development allowances;
- onboarding scope;
- maintenance scope;
- refund policy;
- payment and renewal conditions;
- service suspension for abuse, fraud or non-payment;
- account security responsibilities;
- limitations of liability subject to legal review.

### Recommended initial entitlement shape

This is a proposed product default, not approved binding language:

| Offer | Official production activations | Staging allowance | Official updates | Support/services |
|---|---:|---:|---|---|
| Starter | 1 | 1 linked staging installation | During the purchased update-access period | Limited product support |
| Pro | 1 | 1 linked staging installation | During the purchased update-access period | Installation and onboarding scope |
| Managed | Contract-defined | Contract-defined | During active managed service | Maintenance and operational support |

Final activation counts, durations and renewal rules require explicit product approval.

## 3. Technical entitlement and license keys

### What the key controls

A technical license key may control access to:

- official package downloads;
- official update metadata;
- signed download URLs;
- official support eligibility;
- Pro/Managed onboarding workflows;
- managed service actions;
- activation dashboards and installation records.

### What the key must not claim to control

The key must not be described as removing a recipient’s copyright-license rights to the GPL-covered code already received.

Deactivation may stop future official services, downloads or updates according to the commercial agreement. It must not intentionally disable the customer’s existing storefront merely because update access expired.

### Activation model

Track activations independently from the license:

```text
Entitlement
    -> License
        -> Activation
```

Each activation should contain:

- normalized installation identity;
- environment type: production, staging, development;
- first activation timestamp;
- last validation timestamp;
- status;
- version information safe for support;
- no WordPress administrator credentials.

### Key handling

- display the full key only at issuance or controlled reveal;
- store a safe lookup prefix and a cryptographic hash of the secret portion;
- rate-limit activation and validation routes;
- never log full keys;
- support rotation and revocation;
- audit administrative changes;
- avoid permanent license secrets embedded directly in public JavaScript.

## 4. Service terms

### Starter

Define clearly that the customer is responsible for:

- hosting;
- domain and SSL;
- WordPress and WooCommerce installation;
- backups;
- product content;
- payment-provider accounts;
- regulatory compliance for their own store;
- manual deployment and updates unless otherwise purchased.

### Pro

Define the exact installation deliverables:

- information required from the customer;
- supported hosting conditions;
- staging availability;
- number of review cycles;
- what counts as configuration versus custom development;
- deployment approval process;
- handover point.

### Managed

Define operational boundaries:

- update cadence;
- backup responsibilities;
- staging and validation process;
- rollback conditions;
- support response objectives;
- excluded emergencies or third-party failures;
- renewal and termination behavior.

## Customer-facing legal pages

The platform should expose localized pages for:

```text
/{locale}/legal/software-license
/{locale}/legal/commercial-terms
/{locale}/legal/support-policy
/{locale}/legal/refunds
/{locale}/legal/privacy
/{locale}/legal/trademark
```

Until approved, these pages must be labeled as drafts or review placeholders and must not invent binding terms.

## Purchase consent

Before checkout completion, the customer must be able to access the applicable:

- software license notice;
- commercial terms;
- refund policy;
- privacy policy;
- offer-specific service scope.

The order should persist the accepted document versions and timestamps so later legal text changes do not erase the historical agreement context.

## Data-model additions

Plan entities or immutable snapshots for:

```text
LegalDocument
LegalDocumentVersion
OfferTermsVersion
CustomerAcceptance
```

Suggested fields:

- document type;
- locale;
- version;
- effective date;
- content checksum;
- publication state;
- accepted-at timestamp;
- order or checkout reference;
- customer identity;
- IP/user-agent handling only after privacy review.

## Release gate

A theme release is not commercially releasable until:

- the copyright holder is confirmed;
- the GPL notice is explicit;
- the full license is inside the ZIP;
- third-party notices are complete;
- incompatible assets/dependencies are removed;
- commercial terms are approved;
- refund and privacy policies are approved;
- the package and website show consistent versioned terms;
- legal counsel has reviewed the launch documents.

## Open decisions

- final legal entity and jurisdiction;
- exact update-access period;
- renewal model;
- activation limits;
- staging-domain identification rules;
- refund eligibility after download;
- support response commitments;
- trademark registration and permitted brand usage;
- documentation copyright license;
- legal retention period for acceptance records.
