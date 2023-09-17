export const OrderTypeValues = ["ORDERED", "COOKING", "COOKED", "SERVED"] as const;
export type OrderType = (typeof OrderTypeValues)[number];

export const orderStatusParser = (status: OrderType) => {
  switch (status) {
    case "ORDERED":
      return "주문 접수";
    case "COOKING":
      return "조리 중";
    case "COOKED":
      return "조리 완료";
    case "SERVED":
      return "서빙 완료";
    default:
      return "주문 접수";
  }
};
