import type {Metadata} from "next";
import {Inter} from "next/font/google";
import React from "react";

const inter = Inter({subsets: ["latin"]});
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs'
import './globals.css'
import Provider from "@/components/Provider";

export const metadata: Metadata = {
    title: "AIdeation YT",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang='en'>
            <Provider>
                <body>
                {children}
                </body>
            </Provider>
            </html>
        </ClerkProvider>
    );
}
