import { Metadata } from "next";
import CartPage from "./Cart";

export const metadata:Metadata = {
  title: "Hoodie | Cart",
  description: "View and manage your shopping cart",
}

export default function Page() {
  return <CartPage />
}