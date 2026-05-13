import { useRouter } from "next/router";
import { useAuthStore } from "@/stores/auth-store";

export function useAuth() {
  const router = useRouter();

  const store = useAuthStore();

  async function login(...args: Parameters<typeof store.login>) {
    await store.login(...args);

    if (useAuthStore.getState().isAuthenticated) {
      router.push("/");
    }
  }

  async function logout() {
    store.logout();

    router.push("/login");
  }

  async function register(...args: Parameters<typeof store.register>) {
    await store.register(...args);

    router.push("/login");
  }

  return {
    ...store,

    login,
    logout,
    register,
  };
}
