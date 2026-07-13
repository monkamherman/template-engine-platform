export type PaidOrderItem = {
  orderStatus: "PENDING" | "PAID" | "FAILED" | "CANCELLED" | "REFUNDED" | "PARTIALLY_REFUNDED";
  offerStatus: "DRAFT" | "ACTIVE" | "ARCHIVED";
  quantity: number;
};

export function createsEntitlement(item: PaidOrderItem): boolean {
  return item.orderStatus === "PAID" && item.offerStatus === "ACTIVE" && item.quantity > 0;
}
