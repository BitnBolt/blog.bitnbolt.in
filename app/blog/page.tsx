import type { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
    title: "Project Library – Arduino & IoT Tutorials",
    description:
        "Browse BitnBolt's full library of Arduino and IoT project tutorials. Filter by difficulty level and category to find the perfect hands-on project for your skill level.",
    keywords: [
        "Arduino projects",
        "IoT tutorials",
        "electronics projects",
        "hardware tutorials",
        "BitnBolt blog",
        "learn Arduino",
        "beginner electronics",
        "advanced IoT",
        "sensor projects",
        "microcontroller projects",
    ],
    openGraph: {
        title: "Project Library – Arduino & IoT Tutorials | BitnBolt",
        description:
            "Browse hundreds of Arduino and IoT project tutorials. Filter by difficulty and category to build your next hardware project.",
        url: "https://blog.bitnbolt.in/blog",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "BitnBolt Project Library",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Project Library – Arduino & IoT Tutorials | BitnBolt",
        description:
            "Browse Arduino and IoT project tutorials by difficulty and category.",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "https://blog.bitnbolt.in/blog",
    },
};

export default function BlogPage() {
    return <BlogPageClient />;
}
