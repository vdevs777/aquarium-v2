import { User } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { CustomerForm } from "@/components/forms/customer-form";
import { CustomerSchema } from "@/schemas/customer-schema";
import { customerService } from "@/services/customer.service";
import { goToViewScreen } from "@/utils/go-to-view-screen";
import { toast } from "@/hooks/useToast";
import { handleApiError } from "@/api/helpers/handle-api-error";

export function CustomersCreateScreen() {
  async function handleCreate(data: CustomerSchema) {
    try {
      const { id } = await customerService.create(data);
      goToViewScreen(id);
      toast({
        title: "Cliente cadastrado com sucesso!",
        description: `O cliente foi criado com sucesso.`,
      });
    } catch (error) {
      console.log(error);
      handleApiError(error);
    }
  }

  return (
    <div>
      <PageHeader icon={User} title="Cadastrar" path={["CRM", "Clientes"]} />
      <CustomerForm onSubmit={handleCreate} />
    </div>
  );
}
