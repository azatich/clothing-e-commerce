import { Hoodie } from "../../types/products";

export const handleIncrement = (
  hoodie: Hoodie,
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
  hoodie: Hoodie,
  setSelectedQuantities: React.Dispatch<
    React.SetStateAction<Record<number, number>>
  >
) => {
  setSelectedQuantities((prev) => {
    const newQty = (prev[hoodie.id] || 1) - 1;
    if (newQty < 1) {
      const updated = { ...prev };
      delete updated[hoodie.id];
      return updated;
    }
    return { ...prev, [hoodie.id]: newQty };
  });
};