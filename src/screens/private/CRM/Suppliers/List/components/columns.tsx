import { SortableHeader } from "@/components/ui/data-table/sortable-header";
import { PersonType } from "@/interfaces/enums/PersonType";
import { PersonModel } from "@/interfaces/models/Person";
import { cnpjMask, cpfMask, maskValue } from "@/utils/masks";
import { ColumnDef } from "@tanstack/react-table";

type BuildColumnsProps = {
  selectedPersonTypes: {
    [PersonType.Physical]: boolean;
    [PersonType.Legal]: boolean;
  };
};

export function buildColumns({
  selectedPersonTypes,
}: BuildColumnsProps): ColumnDef<PersonModel>[] {
  const showPhysical = selectedPersonTypes[PersonType.Physical];

  const showLegal = selectedPersonTypes[PersonType.Legal];

  const documentTitle =
    showPhysical && showLegal ? "CPF/CNPJ" : showPhysical ? "CPF" : "CNPJ";

  return [
    {
      accessorKey: "nome",
      header: ({ column }) => SortableHeader(column, "Nome"),
    },

    {
      accessorKey: "cpfCnpj",

      header: ({ column }) => SortableHeader(column, documentTitle),

      cell: ({ row }) => {
        const value = row.original.cpfCnpj;

        if (!value) return null;

        const cleanValue = value.replace(/\D/g, "");

        const mask = cleanValue.length <= 11 ? cpfMask : cnpjMask;

        return maskValue(cleanValue, mask);
      },
    },
  ];
}
