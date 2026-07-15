import type { Metadata } from "next";
import localFont from "next/font/local";
import "../src/styles/globals.css";

const inter = localFont({
  src: [
    {
      path: "../node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../node_modules/@fontsource/inter/files/inter-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../node_modules/@fontsource/inter/files/inter-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

const manrope = localFont({
  src: [
    {
      path: "../node_modules/@fontsource/manrope/files/manrope-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../node_modules/@fontsource/manrope/files/manrope-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../node_modules/@fontsource/manrope/files/manrope-latin-800-normal.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Woo App Template Engine",
    template: "%s | Woo App Template Engine",
  },
  description:
    "Commercial platform for WooCommerce template licensing, releases and services.",
  keywords: [
    "woocommerce",
    "template engine",
    "licensing",
    "commerce"
  ],
  metadataBase: new URL("https://example.com/"),
  openGraph: {
    title: "Woo App Template Engine",
    description:
      "Commercial platform for WooCommerce template licensing, releases and services.",
    url: "https://example.com/",
    siteName: "Woo App Template Engine",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Woo App Template Engine",
    description:
      "Commercial platform for WooCommerce template licensing, releases and services.",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  icons: {
    icon: "/brand/favicon.svg",
    shortcut: "/brand/favicon.svg",
    apple: "/brand/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${manrope.variable}`}>
        {children}
      </body>
    </html>
  );
}
