import { Metadata } from "next";
import Accessories from "./Accessories";

export const metadata: Metadata = {
  title: "Hoodie | Accessories",
  description: "Explore our exclusive collection of accessories.",
}

export default function Page() {
  return <Accessories />
}