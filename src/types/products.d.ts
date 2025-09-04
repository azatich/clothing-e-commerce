export type Product = {
  id: number;
  quantity: number;
}

export type Hoodie = {
  id: number;
  name: string;
  color: string;
  size: string;
  quantity: number;
  image_url: string;
  price: number;
  discount_percent: number;
};

export type Shoe = {
  id: number;
  name: string;
  color: string[];
  size: string;
  quantity: number;
  image_url: string;
  price: number;
  discount_percent: number;
};

export type CartProduct = {
  id: string;
  product_name: string;
  product_id: number;
  color: string[];
  size: string;
  quantity: number;
  maxQuantity: number;
  price: number;
  discount_percent: number;
  image_url: string;
};