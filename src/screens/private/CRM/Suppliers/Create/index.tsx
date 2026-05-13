import { Package, User } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { CustomerForm } from "@/components/forms/customer-form";
import { CustomerSchema } from "@/schemas/customer-schema";
import { goToViewScreen } from "@/utils/go-to-view-screen";
import { toast } from "@/hooks/useToast";
import { handleApiError } from "@/api/helpers/handle-api-error";
import { suppliersService } from "@/services/suppliers.service";
import { SupplierForm } from "@/components/forms/supplier-form";
import { sectionColors } from "@/components/layout/section-colors";

export function SuppliersCreateScreen() {
  async function handleCreate(data: CustomerSchema) {
    try {
      const { id } = await suppliersService.create(data);
      goToViewScreen(id);
      toast({
        title: "Fornecedor cadastrado com sucesso!",
        description: `O fornecedor foi criado com sucesso.`,
      });
    } catch (error) {
      handleApiError(error);
    }
  }

  return (
    <div>
      <PageHeader
        icon={Package}
        title="Cadastrar"
        path={["CRM", "Fornecedores"]}
        color={sectionColors.crm}
      />
      <SupplierForm onSubmit={handleCreate} />
    </div>
  );
}
