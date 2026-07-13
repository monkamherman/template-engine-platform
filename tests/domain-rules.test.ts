import assert from "node:assert/strict";
import test from "node:test";
import { resolveActivePrice } from "../src/modules/catalog/pricing";
import { createsEntitlement } from "../src/modules/entitlements/rules";
import { canActivateLicense, canValidateLicense } from "../src/modules/licensing/rules";
import { canAccessRelease } from "../src/modules/releases/access";

test("resolves exactly one active server-side price", () => {
  const price = resolveActivePrice(
    [
      {
        id: "price_starter_eur",
        offerId: "starter",
        currency: "EUR",
        amountMinor: 4900,
        active: true,
      },
    ],
    { offerId: "starter", currency: "EUR" },
  );

  assert.equal(price.amountMinor, 4900);
});

test("rejects ambiguous active prices", () => {
  assert.throws(() =>
    resolveActivePrice(
      [
        { id: "a", offerId: "starter", currency: "EUR", amountMinor: 4900, active: true },
        { id: "b", offerId: "starter", currency: "EUR", amountMinor: 5900, active: true },
      ],
      { offerId: "starter", currency: "EUR" },
    ),
  );
});

test("creates entitlements only from paid active order items", () => {
  assert.equal(
    createsEntitlement({ orderStatus: "PAID", offerStatus: "ACTIVE", quantity: 1 }),
    true,
  );
  assert.equal(
    createsEntitlement({ orderStatus: "PENDING", offerStatus: "ACTIVE", quantity: 1 }),
    false,
  );
});

test("validates and activates licenses according to status, expiry and limit", () => {
  const now = new Date("2026-01-01T00:00:00.000Z");

  assert.equal(canValidateLicense({ status: "ACTIVE", expiresAt: null, now }), true);
  assert.equal(canValidateLicense({ status: "REVOKED", expiresAt: null, now }), false);
  assert.equal(
    canActivateLicense({
      status: "ACTIVE",
      activationLimit: 2,
      activeActivationCount: 1,
      now,
    }),
    true,
  );
  assert.equal(
    canActivateLicense({
      status: "ACTIVE",
      activationLimit: 1,
      activeActivationCount: 1,
      now,
    }),
    false,
  );
});

test("allows release access only for active entitlement and published active file", () => {
  assert.equal(
    canAccessRelease({
      entitlementStatus: "ACTIVE",
      releaseStatus: "PUBLISHED",
      releaseFileStatus: "ACTIVE",
    }),
    true,
  );
  assert.equal(
    canAccessRelease({
      entitlementStatus: "ACTIVE",
      releaseStatus: "DISABLED",
      releaseFileStatus: "ACTIVE",
    }),
    false,
  );
});
