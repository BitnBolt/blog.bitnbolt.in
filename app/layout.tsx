import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'highlight.js/styles/atom-one-dark.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://blog.bitnbolt.in";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "BitnBolt – Master Arduino & IoT Hardware Engineering",
    template: "%s | BitnBolt",
  },
  description:
    "BitnBolt is your gateway to mastering Arduino, electronics, and IoT. Explore structured learning modules, hands-on project tutorials, and the BitnBolt Dev Board — built for makers and engineers.",
  keywords: [
    "Arduino",
    "IoT",
    "hardware engineering",
    "electronics tutorials",
    "embedded systems",
    "Arduino projects",
    "BitnBolt",
    "learn Arduino",
    "dev board",
    "electronics education",
    "microcontroller",
    "ESP32",
    "sensors",
    "robotics",
    "STEM",
  ],
  authors: [{ name: "BitnBolt Team", url: BASE_URL }],
  creator: "BitnBolt",
  publisher: "BitnBolt",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "BitnBolt",
    title: "BitnBolt – Master Arduino & IoT Hardware Engineering",
    description:
      "From simple circuits to complex IoT systems. Learn to build with the BitnBolt Arduino Kit — your gateway to understanding the physical world through code.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BitnBolt – Master Arduino & IoT Hardware Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BitnBolt – Master Arduino & IoT Hardware Engineering",
    description:
      "From simple circuits to complex IoT systems. Learn to build with the BitnBolt Arduino Kit.",
    images: ["/og-image.png"],
    creator: "@bitnbolt",
    site: "@bitnbolt",
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  verification: {
    // Add your Google Search Console verification token here when available
    // google: "YOUR_GOOGLE_VERIFICATION_TOKEN",
  },
};

// JSON-LD Structured Data — Organization + WebSite schema
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "BitnBolt",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/og-image.png`,
      },
      sameAs: [
        "https://twitter.com/bitnbolt",
        "https://github.com/bitnbolt",
      ],
      description:
        "BitnBolt empowers the next generation of hardware engineers through accessible tools and comprehensive electronics education.",
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "BitnBolt",
      description:
        "Learn Arduino, IoT and electronics with BitnBolt's structured curriculum and project library.",
      publisher: { "@id": `${BASE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
