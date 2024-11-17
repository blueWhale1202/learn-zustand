import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

import { Toaster } from "@/components/ui/sonner";
import { StoreProvider } from "@/providers/store-provider";

export const metadata: Metadata = {
    title: "Zustand Next.js Starter",
    description: "Learn how to use Zustand slice pattern in Next.js TypeScript",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <StoreProvider>{children}</StoreProvider>
                <Toaster richColors position="top-center" theme="light" />
            </body>
        </html>
    );
}
