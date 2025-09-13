import LocaddoLanding from "@/components/LocaddoLanding";

export const metadata = {
  title: "Free Health & Finance Calculators - BMI, Mortgage, Calorie & More | Locaddo",
  description: "Free online calculators for health, fitness, finance, and everyday decisions. Calculate BMI, mortgage payments, daily calories, pregnancy due dates, and more. No signup required.",
  keywords: "free calculators, BMI calculator, mortgage calculator, calorie calculator, health calculators, finance calculators, pregnancy calculator, loan calculator",
  authors: [{ name: "Locaddo Team" }],
  creator: "Locaddo",
  publisher: "Locaddo",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://locaddo.com",
    title: "Free Health & Finance Calculators | Locaddo",
    description: "Free online calculators for health, fitness, finance, and everyday decisions. Calculate BMI, mortgage payments, daily calories, and more.",
    siteName: "Locaddo",
    images: [
      {
        url: "https://locaddo.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Locaddo - Free Health and Finance Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Health & Finance Calculators | Locaddo",
    description: "Free online calculators for health, fitness, finance, and everyday decisions. No signup required.",
    images: ["https://locaddo.com/og-image.jpg"],
    creator: "@locaddo",
  },
  alternates: {
    canonical: "https://locaddo.com",
  },
  other: {
    "google-site-verification": "your-google-verification-code",
    "facebook-domain-verification": "your-facebook-verification-code",
  },
  metadataBase: new URL('https://locaddo.com'),
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: 'technology',
};

export default function Home() {
  return (
    <>
      <LocaddoLanding />
    </>
  );
}