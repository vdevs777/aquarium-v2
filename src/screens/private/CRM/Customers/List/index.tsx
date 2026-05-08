import { PageHeader } from "@/components/page-header";
import { User } from "lucide-react";

export function CustomersListScreen() {
  return (
    <div>
      <PageHeader icon={User} title="Lista" path={["CRM", "Clientes"]} />
    </div>
  );
}
