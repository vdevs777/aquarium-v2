import { PageHeader } from "@/components/page-header";
import { Boxes } from "lucide-react";
import { ProductionSectorBox } from "./components/production-sector-box";
import { CreateButton } from "@/components/buttons/create-button";
import { useState } from "react";
import { CreateDialog } from "./components/dialogs/create-dialog";
import { useQuery } from "@tanstack/react-query";
import { productionSectorService } from "@/services/production-sector.service";
import { Spinner } from "@/components/ui/spinner";
import { ProductionUnitCard } from "./components/production-unit-card";
import { useGetProductionSectors } from "./queries/useGetProductionSectors";

export function ProductionSectorScreen() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const { productionSectors, isLoading } = useGetProductionSectors();

  return (
    <>
      <div>
        <div className="flex w-full items-start justify-between flex-row">
          <PageHeader
            icon={Boxes}
            title="Setor produtivo"
            path={["Operacional", "Produção"]}
          />
          <CreateButton onClick={() => setIsCreateOpen(true)} />
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="w-full flex justify-center pt-6">
              <Spinner className="size-8" />
            </div>
          ) : productionSectors?.length > 0 ? (
            productionSectors.map((sector) => (
              <ProductionSectorBox
                key={sector.id}
                id={sector.id}
                name={sector.nome}
              >
                <div className="grid grid-cols-4 gap-3">
                  {sector.unidades.map((unit) => (
                    <ProductionUnitCard data={unit} key={unit.id} />
                  ))}
                </div>
              </ProductionSectorBox>
            ))
          ) : (
            <div className="w-full flex justify-center pt-6 text-muted-foreground text-sm">
              Não há nenhum setor cadastrado ainda.
            </div>
          )}
        </div>
      </div>

      <CreateDialog onOpenChange={setIsCreateOpen} open={isCreateOpen} />
    </>
  );
}
