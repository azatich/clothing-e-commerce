import type { Metadata } from "next";
import HoodiesPage from "./Hoodies";

export const metadata: Metadata = {
  title: "Hoodie | Hoodies",
  description: "A cozy hoodie to keep you warm."
};

export default function Page() {
  return <HoodiesPage />
}
  