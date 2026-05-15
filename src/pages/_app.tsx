import { useEffect } from "react";

import type { AppProps } from "next/app";

import { Inter } from "next/font/google";

import { env } from "../../env";

import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";

import { useRouter } from "next/router";

import { Layout } from "@/components/layout";

import { useAuthStore } from "@/stores/auth-store";

import { toast } from "@/hooks/useToast";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const pagesWithoutLayout = [
  "/login",
  "/register",
  "/404",
  "/forgot-password",
  "/reset-password/",
];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (env.NEXT_PUBLIC_API_MODE === "mock") {
      import("../mocks/browser").then(({ worker }) => {
        worker.start();
      });
    }
  }, []);

  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;

    async function validateSession() {
      const store = useAuthStore.getState();

      const isAuthorized = await store.validateAuth();

      if (!isAuthorized) {
        store.logout();

        toast({
          title: "Sessão expirada",
          description: "Faça login novamente.",
          variant: "destructive",
        });

        router.push("/login");
      }
    }

    validateSession();
  }, [hasHydrated]);

  const shouldUseLayout = !pagesWithoutLayout.some((route) => {
    if (route.endsWith("/")) {
      return router.pathname.startsWith(route);
    }

    return router.pathname === route;
  });

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className={`${inter.className} bg-white`}>
          {shouldUseLayout ? (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          ) : (
            <Component {...pageProps} />
          )}
        </div>

        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
