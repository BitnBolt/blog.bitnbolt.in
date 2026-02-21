import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "BitnBolt – Master Arduino & IoT Hardware Engineering",
  description:
    "From simple circuits to complex IoT systems. Learn to build with the BitnBolt Arduino Kit — your gateway to understanding the physical world through code. Explore structured courses, hands-on projects, and the BitnBolt Dev Board.",
  keywords: [
    "Arduino",
    "IoT",
    "hardware engineering",
    "BitnBolt Dev Board",
    "electronics kit",
    "learn Arduino",
    "IoT projects",
    "electronics education",
    "microcontroller",
    "STEM hardware",
    "embedded systems",
  ],
  alternates: {
    canonical: "https://blog.bitnbolt.in",
  },
  openGraph: {
    title: "BitnBolt – Master Arduino & IoT Hardware Engineering",
    description:
      "From simple circuits to complex IoT systems. Explore the BitnBolt curriculum and Dev Board.",
    url: "https://blog.bitnbolt.in",
    type: "website",
  },
};

export default function HomePage() {
  return <HomeClient />;
}
