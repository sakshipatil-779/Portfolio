import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#07090D",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Sakshi Patil | Computer Engineer & Developer",
  description:
    "Portfolio of Sakshi Patil – Computer Engineering undergraduate building privacy-focused fintech platforms, decentralized applications and full-stack engineering solutions.",
  authors: [{ name: "Sakshi Patil", url: "https://github.com/sakshipatil-779" }],
  creator: "Sakshi Patil",
  keywords: [
    "Sakshi Patil",
    "Computer Engineer",
    "Full-Stack Developer",
    "Portfolio",
    "Next.js",
    "Solidity",
    "PayScope",
    "FedCreditX",
    "VoteChainX",
    "Federated Learning",
    "Ethereum",
  ],
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/sakshipatil-779",
    title: "Sakshi Patil | Computer Engineer & Developer",
    description:
      "Portfolio of Sakshi Patil – Computer Engineering undergraduate building privacy-focused fintech platforms, decentralized applications and full-stack engineering solutions.",
    siteName: "Sakshi Patil Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sakshi Patil | Computer Engineer & Developer",
    description:
      "Portfolio of Sakshi Patil – Computer Engineering undergraduate building privacy-focused fintech platforms, decentralized applications and full-stack engineering solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className="bg-[#07090D] text-[#F5F7FA] font-sans antialiased overflow-x-hidden selection:bg-[#69E5DC]/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}

