export type Price = {
  id: string;
  offerId: string;
  currency: string;
  amountMinor: number;
  active: boolean;
  validFrom?: Date | null;
  validUntil?: Date | null;
};

export function resolveActivePrice(
  prices: Price[],
  input: { offerId: string; currency: string; now?: Date },
): Price {
  const now = input.now ?? new Date();
  const activePrices = prices.filter((price) => {
    return (
      price.offerId === input.offerId &&
      price.currency === input.currency &&
      price.active &&
      (!price.validFrom || price.validFrom <= now) &&
      (!price.validUntil || price.validUntil > now)
    );
  });

  if (activePrices.length !== 1) {
    throw new Error("Expected exactly one active server-side price");
  }

  return activePrices[0];
}
