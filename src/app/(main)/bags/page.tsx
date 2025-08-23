import { Metadata } from "next";
import Bags from "./Bags";

export const metadata: Metadata = {
  title: "Hoodie | Bags",
  description: "Explore our exclusive collection of bags",
}

export default function Page() {
  return <Bags />
}