import { CreateButton } from "@/components/buttons/create-button";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/ui/data-table";
import { Package, User } from "lucide-react";
import { buildColumns } from "./components/columns";
import { useQuery } from "@tanstack/react-query";
import { customerService } from "@/services/customer.service";
import { Checkbox } from "@/components/ui/checkbox";
import { PersonTypeSelect } from "@/components/person-type-select";
import { useState } from "react";
import { PersonType } from "@/interfaces/enums/PersonType";
import { suppliersService } from "@/services/suppliers.service";
import { sectionColors } from "@/components/layout/section-colors";

export function SuppliersListScreen() {
  const [selectedPersonTypes, setSelectedPersonTypes] = useState({
    [PersonType.Legal]: true,
    [PersonType.Physical]: true,
  });

  const { data, isLoading, error } = useQuery({
    queryFn: suppliersService.getAll,
    queryKey: ["suppliers"],
  });

  const filteredData = data
    ?.map((customer) => customer.pessoa)
    ?.filter((person) => {
      if (
        person.tipoPessoa === PersonType.Physical &&
        !selectedPersonTypes[PersonType.Physical]
      ) {
        return false;
      }

      if (
        person.tipoPessoa === PersonType.Legal &&
        !selectedPersonTypes[PersonType.Legal]
      ) {
        return false;
      }

      return true;
    });

  return (
    <div>
      <div className="flex-row flex justify-between items-center w-full">
        <PageHeader
          icon={Package}
          title="Lista"
          path={["CRM", "Fornecedores"]}
          color={sectionColors.crm}
        />
        <div className="flex space-x-4 flex-row items-center">
          <PersonTypeSelect
            value={selectedPersonTypes}
            onCheck={{
              [PersonType.Physical]: (checked) => {
                setSelectedPersonTypes((prev) => ({
                  ...prev,
                  [PersonType.Physical]: checked,
                }));
              },

              [PersonType.Legal]: (checked) => {
                setSelectedPersonTypes((prev) => ({
                  ...prev,
                  [PersonType.Legal]: checked,
                }));
              },
            }}
          />
          <CreateButton />
        </div>
      </div>
      <DataTable
        columns={buildColumns({ selectedPersonTypes })}
        data={filteredData ?? []}
        isLoading={isLoading}
        error={error?.message}
        hasClick
      />
    </div>
  );
}
