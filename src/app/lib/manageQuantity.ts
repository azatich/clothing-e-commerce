import { Product } from "../types/products";

export const handleIncrement = (
  hoodie: Product,
  setSelectedQuantities: React.Dispatch<
    React.SetStateAction<Record<number, number>>
  >
) => {
  setSelectedQuantities((prev) => ({
    ...prev,
    [hoodie.id]: Math.min((prev[hoodie.id] || 1) + 1, hoodie.quantity),
  }));
};

export const handleDecrement = (
  hoodie: Product,
  setSelectedQuantities: React.Dispatch<
    React.SetStateAction<Record<number, number>>
  >
) => {
  setSelectedQuantities((prev) => {
    const newQty = (prev[hoodie.id] || 1) - 1;
    if (newQty < 1) {
      const { [hoodie.id]: _, ...rest } = prev;
      return rest;
    }
    return { ...prev, [hoodie.id]: newQty };
  });
};
