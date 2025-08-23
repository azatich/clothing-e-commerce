import type { Metadata } from "next";
import Shoes from "./Shoes";

export const metadata: Metadata = {
  title: "Hoodie | Shoes",
  description: "Explore our collection of stylish shoes."
};

export default function Page() {
  return <Shoes />
}
  