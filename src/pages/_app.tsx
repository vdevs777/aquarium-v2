import { useEffect } from "react";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { env } from "@/env";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  useEffect(() => {
    if (env.NEXT_PUBLIC_API_MODE === "mock") {
      import("../mocks/browser").then(({ worker }) => {
        worker.start();
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`${inter.className} bg-white`}>
        <Component {...pageProps} />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}
