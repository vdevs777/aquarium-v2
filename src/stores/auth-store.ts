import { create } from "zustand";
import { persist } from "zustand/middleware";

import { jwtDecode } from "jwt-decode";

import { accountService } from "@/services/account.service";

import { LoginSchema } from "@/schemas/login-schema";
import { RegisterSchema } from "@/schemas/register-schema";

import { CompanyModel } from "@/interfaces/models/Company";
import { JwtPayload } from "@/interfaces/payloads/JwtPayload";

import { handleApiError } from "@/api/helpers/handle-api-error";

import { toast } from "@/hooks/useToast";

import { unmask } from "@/utils/masks";
import api from "@/api";

type AuthStatus = "authenticated" | "unauthenticated" | "loading";

type AuthUser = {
  email: string;
};

type AuthStore = {
  token: string | null;

  companies: CompanyModel[];

  user: AuthUser | null;

  status: AuthStatus;

  isAuthenticated: boolean;

  hasHydrated: boolean;

  login: (data: LoginSchema) => Promise<void>;

  register: (data: RegisterSchema) => Promise<void>;

  logout: () => void;

  fetchCompanies: () => Promise<void>;

  selectCompany: (companyId: string) => Promise<void>;

  validateAuth: () => Promise<boolean>;

  setToken: (token: string | null) => void;

  setHasHydrated: (value: boolean) => void;
};

function extractUserFromToken(token: string): AuthUser | null {
  try {
    const pureToken = token.startsWith("Bearer ") ? token.slice(7) : token;

    const decoded = jwtDecode<JwtPayload>(pureToken);

    return {
      email: decoded.email,
    };
  } catch {
    return null;
  }
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      token: null,

      user: null,

      companies: [],

      status: "unauthenticated",

      isAuthenticated: false,

      hasHydrated: false,

      setHasHydrated(value) {
        set({
          hasHydrated: value,
        });
      },

      setToken(token) {
        const user = token ? extractUserFromToken(token) : null;

        if (token) {
          api.defaults.headers.common.Authorization = `Bearer ${token}`;
        } else {
          delete api.defaults.headers.common.Authorization;
        }

        set({
          token,
          user,
          isAuthenticated: !!token,
          status: token ? "authenticated" : "unauthenticated",
        });
      },

      async login(data) {
        try {
          set({
            status: "loading",
          });

          const response = await accountService.login(data);

          const token =
            //@ts-ignore
            typeof response === "string" ? response : response.token;

          if (!token) {
            throw new Error("Token não encontrado");
          }

          get().setToken(token);
        } catch (error) {
          get().setToken(null);

          handleApiError(error);
        }
      },

      async register(data) {
        const unmaskedPhone = unmask(data.telefone);

        const unmaskedCnpj = unmask(data.cpfCnpj);

        const ddd = unmaskedPhone.slice(0, 2);

        const phone = unmaskedPhone.slice(2);

        try {
          const result = await accountService.register({
            ...data,
            ddd,
            telefone: phone,
            cpfCnpj: unmaskedCnpj,
          });

          if (result === "success") {
            toast({
              title: "Empresa registrada com sucesso",
              description: "Realize o login e selecione a nova empresa.",
            });
          }

          if (result === "pending") {
            toast({
              title: "Empresa registrada com sucesso",
              description: "Um e-mail de confirmação foi enviado.",
            });
          }
        } catch (error) {
          handleApiError(error);
        }
      },

      logout() {
        get().setToken(null);

        set({
          companies: [],
        });
      },

      async fetchCompanies() {
        try {
          const companies = await accountService.getCompanies();

          set({
            companies,
          });
        } catch (error) {
          handleApiError(error);
        }
      },

      async selectCompany(companyId) {
        try {
          const token =
            await accountService.refreshTokenWithTenantId(companyId);

          get().setToken(token);
        } catch (error) {
          handleApiError(error);
        }
      },

      async validateAuth() {
        try {
          const authorized = await accountService.checkAuthorization();

          if (!authorized) {
            set({
              token: null,
              user: null,
              isAuthenticated: false,
              status: "unauthenticated",
            });

            return false;
          }

          set({
            isAuthenticated: true,
            status: "authenticated",
          });

          return true;
        } catch {
          set({
            token: null,
            user: null,
            isAuthenticated: false,
            status: "unauthenticated",
          });

          return false;
        }
      },
    }),
    {
      name: "auth-storage",

      partialize(state) {
        return {
          token: state.token,
          user: state.user,
        };
      },

      onRehydrateStorage() {
        return (state) => {
          if (!state) return;

          state.setToken(state.token);

          state.setHasHydrated(true);
        };
      },
    },
  ),
);
