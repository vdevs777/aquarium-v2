import { SimpleTable } from "@/components/simple-table";
import { Calculator } from "lucide-react";

export function Feeding() {
  return (
    <SimpleTable
      title="Alimentação"
      icon={Calculator}
      data={[
        { id: "1", label: "01/09/2024", value: "1,100g" },
        { id: "2", label: "02/09/2024", value: "1,105g" },
        { id: "3", label: "03/09/2024", value: "1,108g" },
        { id: "4", label: "04/09/2024", value: "1,1010g" },
      ]}
    />
  );
}
