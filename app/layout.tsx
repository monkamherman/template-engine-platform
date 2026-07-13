import type { Metadata } from "next";
import "../styles/globals.css";

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
    icon: "/favicon.ico",
    shortcut: "/og-image.png",
    apple: "/og-image.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`font-nexa`}
      >
        {children}
      </body>
    </html>
  );
}
