import { PageHeader } from "@/components/page-header";
import { productionUnitService } from "@/services/production-unit.service";
import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";
import { LayoutDashboard } from "lucide-react";
import { Actions } from "./components/actions";
import { SelectProductionUnit } from "./components/select-production-unit";
import { useRouter } from "next/router";
import { Spinner } from "@/components/ui/spinner";
import { Cards } from "./components/cards";
import { Feeding } from "./components/feeding";
import { Allocations } from "./components/allocations";
import { GrowthCurve } from "./components/growth-curve";
import { History } from "@/components/history";
import { formatDateTime } from "@/utils/date-fns";
import { StockingDialog } from "@/components/dialogs/stocking-dialog";
import { TransferDialog } from "@/components/dialogs/transfer-dialog";
import { HarvestDialog } from "@/components/dialogs/harvest-dialog";
import { useState } from "react";
import { useBatchStock } from "@/queries/useBatchStock";
import { useTransfer } from "@/queries/useTransfer";
import { useHarvest } from "@/queries/useHarvest";
import { MoveProductionUnitDialog } from "@/components/dialogs/move-production-unit-dialog";
import { useMoveProductionUnit } from "@/queries/useMoveProductionUnit";

function getProductionUnitKeys(id?: number): QueryKey[] {
  if (!id) return [];

  return [
    ["production-unit-details", id],
    ["production-unit-summary-allocations", id],
    ["production-unit-summary-history", id],
  ];
}

export function ProductionUnitAnalysisScreen() {
  const router = useRouter();

  const [isStockingOpen, setIsStockingOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isHarvestOpen, setIsHarvestOpen] = useState(false);
  const [isMoveOpen, setIsMoveOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const id =
    router.isReady && router.query.id ? Number(router.query.id) : undefined;

  const unitKeys = getProductionUnitKeys(id);

  const { data: productionUnits = [] } = useQuery({
    queryKey: ["production-units"],
    queryFn: productionUnitService.getAll,
  });

  const queryClient = useQueryClient();

  console.log(
    queryClient
      .getQueryCache()
      .getAll()
      .map((q) => q.queryKey),
  );

  console.log("Invalidando:", unitKeys);

  const {
    data: details,
    isLoading,
    isFetching: isFetchingDetails,
    refetch: refetchDetails,
  } = useQuery({
    queryKey: ["production-unit-details", id],
    queryFn: () => productionUnitService.getByIdDetails(id!),
    enabled: !!id,
  });

  const {
    data: allocations,
    isFetching: isFetchingAllocations,
    refetch: refetchAllocations,
  } = useQuery({
    queryKey: ["production-unit-summary-allocations", id],
    queryFn: () => productionUnitService.getSummaryAllocationsById(id!),
    enabled: !!id,
  });

  const {
    data: history,
    isFetching: isFetchingHistory,
    refetch: refetchHistory,
  } = useQuery({
    queryKey: ["production-unit-summary-history", id],
    queryFn: () => productionUnitService.getHistoryById(id!),
    enabled: !!id,
  });

  const { mutateAsync: stock } = useBatchStock({
    closeDialog: () => setIsStockingOpen(false),
    invalidateQueryKeys: [["production-units"], ...unitKeys],
  });

  const { mutateAsync: transfer } = useTransfer({
    closeDialog: () => setIsTransferOpen(false),
    invalidateQueryKeys: [["production-units"], ...unitKeys],
  });

  const { mutateAsync: harvest } = useHarvest({
    closeDialog: () => setIsHarvestOpen(false),
    invalidateQueryKeys: [["production-units"], ...unitKeys],
  });

  const { mutateAsync: moveUnit } = useMoveProductionUnit({
    closeDialog: () => setIsMoveOpen(false),
    queryKeys: [
      ["production-sectors-details"],
      ["production-units"],
      ["production-unit-details", id],
    ],
  });

  const isBusy =
    isLoading ||
    isFetchingDetails ||
    isFetchingAllocations ||
    isFetchingHistory;

  return (
    <>
      <div>
        <div className="w-full flex justify-between items-center">
          <PageHeader
            path={["Operacional", "Produção", "Unidade produtiva"]}
            title="Análise"
            icon={LayoutDashboard}
          />
          <div className="flex flex-row gap-2">
            <SelectProductionUnit productionUnits={productionUnits} />
            <Actions
              disableAll={!details || isBusy}
              onRefresh={async () => {
                await Promise.all([
                  refetchDetails(),
                  refetchAllocations(),
                  refetchHistory(),
                ]);
              }}
              onHarvest={() => setIsHarvestOpen(true)}
              onStocking={() => setIsStockingOpen(true)}
              onTransfer={() => setIsTransferOpen(true)}
              onMove={() => setIsMoveOpen(true)}
              onEdit={() => setIsEditOpen(true)}
            />
          </div>
        </div>

        {!id && null}

        {id && isBusy && (
          <div className="w-full justify-center flex mt-8">
            <Spinner className="size-6" />
          </div>
        )}

        {id && !isBusy && details && (
          <div className="space-y-6">
            <Cards details={details} />
            <div className="grid grid-cols-3 gap-2 items-start">
              <Feeding />
              {allocations && <Allocations data={allocations} />}
            </div>
            <GrowthCurve />
            {history && (
              <History
                items={history.map((item) => {
                  return {
                    userName: item.userName,
                    header: item.descricao ?? "",
                    date: formatDateTime(item.data),
                    description: item.historico,
                  };
                })}
              />
            )}
          </div>
        )}
      </div>
      {details && (
        <>
          <StockingDialog
            productionUnit={{
              code: details.codigo,
              sequence: details.sequencia,
            }}
            open={isStockingOpen}
            onOpenChange={setIsStockingOpen}
            onSubmit={async (formData) => {
              await stock({ ...formData, unidadeProdutivaId: details.id });
            }}
            defaultValues={{ sequencia: details.sequencia }}
          />
          <TransferDialog
            open={isTransferOpen}
            onOpenChange={setIsTransferOpen}
            productionUnit={{
              code: details.codigo,
              sequence: details.sequencia,
            }}
            fishAmount={details.numeroPeixes ?? 0}
            onSubmit={async (formData) => {
              await transfer({
                ...formData,
                unidadeProdutivaOrigemId: details.id,
              });
            }}
          />
          <HarvestDialog
            open={isHarvestOpen}
            onOpenChange={setIsHarvestOpen}
            productionUnit={{
              code: details.codigo,
              sequence: details.sequencia,
            }}
            fishAmount={details.numeroPeixes ?? 0}
            onSubmit={async (formData) => {
              await harvest({ ...formData, unidadeProdutivaId: details.id });
            }}
          />
          <MoveProductionUnitDialog
            open={isMoveOpen}
            onOpenChange={setIsMoveOpen}
            onSubmit={async (formData) => {
              await moveUnit({
                productionUnitId: details.id,
                destinationSectorId: formData.idSetorDestino,
                sequence: formData.sequencia,
              });
            }}
          />
        </>
      )}
    </>
  );
}
