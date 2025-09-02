import { Product } from "../../types/products";

export const handleIncrement = (
  product: Product,
  setSelectedQuantities: React.Dispatch<
    React.SetStateAction<Record<number, number>>
  >
) => {
  setSelectedQuantities((prev) => ({
    ...prev,
    [product.id]: Math.min((prev[product.id] || 1) + 1, product.quantity),
  }));
};

export const handleDecrement = (
  product: Product,
  setSelectedQuantities: React.Dispatch<
    React.SetStateAction<Record<number, number>>
  >
) => {
  setSelectedQuantities((prev) => {
    const newQty = (prev[product.id] || 1) - 1;
    if (newQty < 1) {
      const updated = { ...prev };
      delete updated[product.id];
      return updated;
    }
    return { ...prev, [product.id]: newQty };
  });
};