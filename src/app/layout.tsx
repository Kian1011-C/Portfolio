import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Khai Nguyen Phuong | Backend Developer & Software Engineering Student",
  description:
    "Portfolio of Khai Nguyen Phuong — Software Engineering student at FPT University. Specializing in backend development, microservices, distributed systems, and IoT solutions.",
  keywords: [
    "Khai Nguyen Phuong",
    "backend developer",
    "software engineering",
    "FPT University",
    "microservices",
    "distributed systems",
    "IoT",
    "Java",
    "C#",
    ".NET",
    "OpenTelemetry",
  ],
  authors: [{ name: "Khai Nguyen Phuong" }],
  openGraph: {
    title: "Khai Nguyen Phuong | Backend Developer",
    description:
      "Software Engineering student specializing in backend development, microservices, distributed tracing, and IoT.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Khai Nguyen Phuong | Backend Developer",
    description:
      "Software Engineering student specializing in backend development, microservices, and distributed systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-full bg-[#09090f] text-slate-100">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
