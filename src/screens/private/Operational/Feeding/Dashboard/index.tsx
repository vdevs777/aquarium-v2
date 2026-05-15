import { sectionColors } from "@/components/layout/section-colors";
import { NoResults } from "@/components/no-results";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { productionSectorService } from "@/services/production-sector.service";
import { productionUnitService } from "@/services/production-unit.service";
import { formatNumber } from "@/utils/number";
import { useQuery } from "@tanstack/react-query";
import { CircleQuestionMark, Wheat } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export function FeedingDashboardScreen() {
  const { data: productionSectors } = useQuery({
    queryKey: ["production-sectors"],
    queryFn: productionSectorService.getAll,
  });

  const [selectedSectorId, setSelectedSectorId] = useState("all");

  const {
    data: productionUnitsDetailed,
    isLoading: loadingProductionUnitsDetailed,
  } = useQuery({
    queryKey: ["production-units-detailed"],
    queryFn: productionUnitService.getDetailed,
  });

  const filteredProductionUnits = useMemo(() => {
    if (!productionUnitsDetailed) return [];

    if (selectedSectorId === "all") {
      return productionUnitsDetailed;
    }

    return productionUnitsDetailed.filter(
      (unit) => unit.idSetorProdutivo?.toString() === selectedSectorId,
    );
  }, [productionUnitsDetailed, selectedSectorId]);

  return (
    <div>
      <div className="flex flex-row items-center justify-between w-full">
        <PageHeader
          icon={Wheat}
          title="Painel"
          color={sectionColors.operational}
          path={["Alimentação"]}
        />
        <div className="space-x-4 flex">
          <div className="flex items-center gap-4">
            <p className="text-xs">Dia: 13/05/2026 / Temperatura: 28ºC</p>
            <Label className="whitespace-nowrap">Setor produtivo</Label>

            <Select
              value={selectedSectorId}
              onValueChange={setSelectedSectorId}
            >
              <SelectTrigger className="bg-white flex-1 min-w-62">
                <SelectValue placeholder="Selecione o setor produtivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="font-bold">
                  Todos
                </SelectItem>
                {productionSectors?.map((sector) => (
                  <SelectItem key={sector.id} value={sector.id.toString()}>
                    {sector.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline">Salvar alterações</Button>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden max-w-[83vw]">
        <div className="overflow-x-auto">
          <Table className="w-max min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 z-30 bg-background min-w-[140px]">
                  Unid. prod
                </TableHead>
                <TableHead
                  className="
    sticky left-[140px] z-30 bg-background min-w-[180px]
    after:absolute after:top-0 after:right-0 after:h-full
    after:w-[1px] after:bg-border
    after:shadow-[4px_0_8px_rgba(0,0,0,0.12)]
  "
                >
                  Fase cultivo
                </TableHead>
                <TableHead>F.C.A.</TableHead>
                <TableHead>Número de peixes</TableHead>
                <TableHead>Biomassa (g)</TableHead>
                <TableHead>Peso médio plan. (g)</TableHead>
                <TableHead>Peso médio (g)</TableHead>
                <TableHead>Ração plan. (g)</TableHead>
                <TableHead>Ração ofertada (g)</TableHead>
                <TableHead>Mortalidade (und.)</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredProductionUnits.length > 0 ? (
                filteredProductionUnits.map((unit, idx) => (
                  <TableRow key={`${unit.id}-${unit.idSetorProdutivo}-${idx}`}>
                    <TableCell className="sticky left-0 z-20 bg-white min-w-[140px]">
                      <Link
                        href={`/operational/production/production-unit/analysis?id=${unit.id}`}
                        className="text-blue-500 hover:underline"
                      >
                        {unit.codigo}.{unit.sequencia}
                      </Link>
                    </TableCell>

                    <TableCell
                      className="
    sticky left-[140px] z-20 bg-white min-w-[180px]
    after:absolute after:top-0 after:right-0 after:h-full
    after:w-[1px] after:bg-border
    after:shadow-[4px_0_8px_rgba(0,0,0,0.12)]
  "
                    >
                      <Link
                        href={`/operational/production/culture-stage/view/${unit.idFaseCultivo}`}
                        className="text-blue-500 hover:underline"
                      >
                        {unit.faseCultivo}
                      </Link>
                    </TableCell>

                    <TableCell>{unit.fatorConversaoAlimentar}</TableCell>

                    <TableCell>
                      {formatNumber(unit.numeroPeixes, {
                        minimumFractionDigits: 0,
                      })}
                    </TableCell>

                    <TableCell>0</TableCell>
                    <TableCell>0</TableCell>

                    <TableCell>{formatNumber(unit.pesoMedio)}</TableCell>

                    <TableCell>0</TableCell>

                    <TableCell>
                      <div
                        className="grid gap-1.5 items-end"
                        style={{
                          gridAutoFlow: "column",
                          gridAutoColumns: "110px",
                        }}
                      >
                        {Array.from({
                          length: unit.frequenciaAlimentar ?? 0,
                        }).map((_, idx) => (
                          <Input key={idx} className="h-[25px]" />
                        ))}
                      </div>
                    </TableCell>

                    <TableCell>
                      <Input className="w-[110px] h-[25px]" />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <NoResults colSpan={10} />
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
