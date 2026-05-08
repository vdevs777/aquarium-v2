import { User } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { CustomerForm } from "@/components/forms/customer-form";
import { CustomerSchema } from "@/schemas/customer-schema";
import { customerService } from "@/services/customer.service";
import { goToViewScreen } from "@/utils/go-to-view-screen";
import { toast } from "@/hooks/useToast";
import { handleApiError } from "@/api/helpers/handle-api-error";
import { useValidatedNumberIdQuery } from "@/hooks/useValidatedNumberIdQuery";
import { titleViewFormatter } from "@/utils/title-view-formatter";
import { PageState } from "@/components/page-state";

export function CustomersViewScreen() {
  const { id, data, isLoading, error, isValidId, isReady } =
    useValidatedNumberIdQuery({
      queryFn: (id) => customerService.getById(id),
      queryKey: ["customer"],
    });

  const title = titleViewFormatter({
    pageId: id,
    isReady,
    isLoading,
    error,
    name: "Cliente",
    itemName: data?.pessoa.nome ?? "",
  });

  async function handleCreate(data: CustomerSchema) {
    try {
      const {
        id,
        pessoa: { nome },
      } = await customerService.create(data);
      goToViewScreen(id);
      toast({
        title: "Cliente cadastrado com sucesso!",
        description: `O cliente ${nome} foi criado com sucesso.`,
      });
    } catch (error) {
      handleApiError(error);
    }
  }

  return (
    <div>
      <PageHeader icon={User} title={title} path={["CRM", "Clientes"]} />
      <PageState
        isValidId={isValidId}
        isLoading={isLoading}
        error={error}
        isReady={isReady}
      >
        <CustomerForm
          onSubmit={handleCreate}
          //@ts-ignore
          defaultValues={data?.pessoa}
        />
      </PageState>
    </div>
  );
}
