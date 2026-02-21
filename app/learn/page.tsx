import type { Metadata } from "next";
import LearnPageClient from "./LearnPageClient";

export const metadata: Metadata = {
    title: "Learn Arduino & IoT – Structured Curriculum",
    description:
        "Master Arduino and IoT with BitnBolt's structured, chapter-by-chapter curriculum. From fundamentals to advanced communication protocols — learn at your own pace with hands-on modules.",
    keywords: [
        "learn Arduino",
        "Arduino curriculum",
        "IoT course",
        "electronics course",
        "embedded systems tutorial",
        "Arduino for beginners",
        "BitnBolt learn",
        "microcontroller programming",
        "I2C SPI tutorial",
        "hardware engineering course",
        "OLED Arduino",
        "sensor programming",
    ],
    openGraph: {
        title: "Learn Arduino & IoT – Structured Curriculum | BitnBolt",
        description:
            "Follow BitnBolt's meticulously crafted chapters to master every aspect of Arduino and IoT — from your first LED blink to complex wireless systems.",
        url: "https://blog.bitnbolt.in/learn",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "BitnBolt Learn – Arduino & IoT Curriculum",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Learn Arduino & IoT – Structured Curriculum | BitnBolt",
        description:
            "Master Arduino from beginner to advanced with BitnBolt's structured learning curriculum.",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "https://blog.bitnbolt.in/learn",
    },
};

// JSON-LD: Course structured data
const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "BitnBolt Arduino & IoT Curriculum",
    description:
        "A comprehensive, structured course covering Arduino fundamentals, sensor integration, communication protocols, and advanced IoT system design.",
    url: "https://blog.bitnbolt.in/learn",
    provider: {
        "@type": "Organization",
        name: "BitnBolt",
        url: "https://blog.bitnbolt.in",
    },
    educationalLevel: "Beginner to Advanced",
    teaches: [
        "Arduino programming",
        "Electronics fundamentals",
        "IoT system design",
        "Sensor integration",
        "I2C and SPI communication",
        "Wireless control",
    ],
    inLanguage: "en",
    isAccessibleForFree: true,
};

export default function LearnPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
            />
            <LearnPageClient />
        </>
    );
}
