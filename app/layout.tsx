import type { Metadata } from "next";
import { Inter, Space_Grotesk, Public_Sans, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { getSiteConfig } from "@/lib/cms";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Neon Noir Portfolio | Digital Architect",
    template: "%s | Neon Noir Portfolio",
  },
  description:
    "High-fidelity, performance-driven interfaces for visionary brands. Bridging cinematic design and robust engineering.",
  keywords: [
    "portfolio",
    "web developer",
    "frontend",
    "react",
    "nextjs",
    "design engineer",
  ],
  openGraph: {
    title: "Neon Noir Portfolio",
    description:
      "Building the future of digital experiences with technological elegance.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch site config from CMS
  const siteConfig = await getSiteConfig();

  return (
    <html
      lang="en"
      data-theme="dark"
      className={cn("dark antialiased", inter.variable, spaceGrotesk.variable, publicSans.variable, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-on-background font-[Inter] relative overflow-x-hidden selection:bg-secondary selection:text-on-secondary">
        <ThemeProvider>
          <Navbar 
            siteName={siteConfig.name} 
            email={siteConfig.email}
            socials={siteConfig.socials}
          />
          <main className="flex-grow">{children}</main>
          <Footer 
            siteName={siteConfig.name}
            socials={siteConfig.socials}
          />
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
