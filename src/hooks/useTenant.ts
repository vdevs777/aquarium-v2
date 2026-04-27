import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { accountService } from "@/services/account.service";

export function useTenant() {
  const [tenant, setTenantState] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  const {
    data: companies,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: accountService.getCompanies,
  });

  async function setTenant(tenantId: string) {
    document.body.style.cursor = "wait";

    sessionStorage.setItem("tenant_id", tenantId);
    setTenantState(tenantId);

    const token = await accountService.refreshTokenWithTenantId(tenantId);
    localStorage.setItem("token", token);

    document.body.style.cursor = "default";
  }

  useEffect(() => {
    const stored = sessionStorage.getItem("tenant_id");
    setTenantState(stored);
    setIsReady(true);
  }, []);

  useEffect(() => {
    async function initTenant() {
      if (!companies?.length || !isReady) return;

      const firstTenant = companies[0].id;

      if (!tenant) {
        await setTenant(firstTenant);
      } else {
        await setTenant(tenant);
      }
    }

    if (isSuccess) {
      initTenant();
    }
  }, [isSuccess, companies, isReady]);

  return {
    companies,
    isLoading,
    tenant,
    setTenant,
    isReady,
  };
}
