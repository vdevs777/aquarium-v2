import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductionUnitDetailsModel } from "@/interfaces/models/ProductionUnit";
import { formatNumber } from "@/utils/number";
import { capitalize } from "@/utils/string";
import { Fish, Leaf, Settings, Weight } from "lucide-react";
import { ProductionUnitCardActions } from "./production-unit-card-actions";
import { useState } from "react";
import { MoveProductionUnitDialog } from "@/components/dialogs/move-production-unit-dialog";
import { useMutation } from "@tanstack/react-query";
import { useMoveProductionUnit } from "../mutations/useMoveProductionUnit";
import { StockingDialog } from "@/components/dialogs/stocking-dialog";
import { useBatchStock } from "../mutations/useBatchStock";
import { TransferDialog } from "@/components/dialogs/transfer-dialog";
import { useTransfer } from "../mutations/useTransfer";
import { HarvestDialog } from "@/components/dialogs/harvest-dialog";
import { useHarvest } from "../mutations/useHarvest";

type ProductionUnitCardProps = {
  data: ProductionUnitDetailsModel;
};

export function ProductionUnitCard({ data }: ProductionUnitCardProps) {
  const [isMoveOpen, setIsMoveOpen] = useState(false);
  const [isStockingOpen, setIsStockingOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isHarvestOpen, setIsHarvestOpen] = useState(false);

  const { mutateAsync: moveUnit } = useMoveProductionUnit({
    closeDialog: () => setIsMoveOpen(false),
  });

  const { mutateAsync: stock } = useBatchStock({
    closeDialog: () => setIsStockingOpen(false),
  });

  const { mutateAsync: transfer } = useTransfer({
    closeDialog: () => setIsTransferOpen(false),
  });

  const { mutateAsync: harvest } = useHarvest({
    closeDialog: () => setIsHarvestOpen(false),
  });

  return (
    <>
      <Card className="w-80 rounded-2xl border border-zinc-200 ">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold tracking-tight">
              {data.codigo}.{data.sequencia}
            </CardTitle>

            <div className="flex flex-row gap-2">
              <Badge className="bg-green-100 text-green-700 border-none">
                {capitalize(data.status)}
              </Badge>
              <ProductionUnitCardActions
                onDelete={() => {}}
                onDetails={() => {}}
                onEdit={() => {}}
                onHarvest={() => setIsHarvestOpen(true)}
                onMove={() => setIsMoveOpen(true)}
                onStocking={() => setIsStockingOpen(true)}
                onTransfer={() => setIsTransferOpen(true)}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1 p-3 rounded-xl bg-blue-50">
              <span className="flex items-center gap-2 text-xs text-blue-600">
                <Fish className="w-4 h-4" />
                Peixes
              </span>
              <span className="text-sm font-semibold text-blue-700">
                {formatNumber(data.numeroPeixes, {
                  minimumFractionDigits: 0,
                })}
              </span>
            </div>

            <div className="flex flex-col gap-1 p-3 rounded-xl bg-orange-50">
              <span className="flex items-center gap-2 text-xs text-orange-600">
                <Weight className="w-4 h-4" />
                Peso médio
              </span>
              <span className="text-sm font-semibold text-orange-700">
                {formatNumber(data.pesoMedio, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
                g
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm border-t pt-3">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Leaf className="w-4 h-4 text-green-500" />
              Fase
            </span>
            <span className="font-medium">{data.faseCultivo}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Settings className="w-4 h-4 text-gray-500" />
              Alimentação
            </span>
            <span className="font-medium">{data.tipoAlimentacao}</span>
          </div>
        </CardContent>
      </Card>
      <MoveProductionUnitDialog
        open={isMoveOpen}
        onOpenChange={setIsMoveOpen}
        onSubmit={async (formData) => {
          await moveUnit({
            productionUnitId: data.id,
            destinationSectorId: formData.idSetorDestino,
            sequence: formData.sequencia,
          });
        }}
      />
      <StockingDialog
        productionUnit={{ code: data.codigo, sequence: data.sequencia }}
        open={isStockingOpen}
        onOpenChange={setIsStockingOpen}
        onSubmit={async (formData) => {
          await stock({ ...formData, unidadeProdutivaId: data.id });
        }}
      />
      <TransferDialog
        open={isTransferOpen}
        onOpenChange={setIsTransferOpen}
        productionUnit={{ code: data.codigo, sequence: data.sequencia }}
        fishAmount={data.numeroPeixes ?? 0}
        onSubmit={async (formData) => {
          await transfer({ ...formData, unidadeProdutivaOrigemId: data.id });
        }}
      />
      <HarvestDialog
        open={isHarvestOpen}
        onOpenChange={setIsHarvestOpen}
        productionUnit={{ code: data.codigo, sequence: data.sequencia }}
        fishAmount={data.numeroPeixes ?? 0}
        onSubmit={async (formData) => {
          await harvest({ ...formData, unidadeProdutivaId: data.id });
        }}
      />
    </>
  );
}
