import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductionUnitModel } from "@/interfaces/models/ProductionUnit";
import { useRouter } from "next/router";

type SelectProductionUnitProps = {
  productionUnits: ProductionUnitModel[];
};

export function SelectProductionUnit({
  productionUnits,
}: SelectProductionUnitProps) {
  const router = useRouter();

  const selectedId = router.query.id?.toString();

  function handleChange(value: string) {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, id: value },
      },
      undefined,
      { shallow: true },
    );
  }

  return (
    <div className="flex space-x-4">
      <Label>Unidade produtiva</Label>

      <Select value={selectedId} onValueChange={handleChange}>
        <SelectTrigger className="bg-white w-80">
          <SelectValue placeholder="Selecione a unidade produtiva" />
        </SelectTrigger>

        <SelectContent className="h-96">
          {productionUnits?.map((productionUnit) => (
            <SelectItem
              key={productionUnit.id}
              value={productionUnit.id.toString()}
            >
              {productionUnit.setorProdutivoNome ?? "Sem alocação"} -{" "}
              {productionUnit.codigo}
              {productionUnit.sequencia ? `.${productionUnit.sequencia}` : null}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
