import { handleApiError } from "@/api/helpers/handle-api-error";
import { CreateButton } from "@/components/buttons/create-button";
import { PopulateButton } from "@/components/buttons/populate-button";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "@/hooks/useToast";
import { SpeciesModel } from "@/interfaces/models/Species";
import { populateSpecies } from "@/mocks/handlers/species";
import { speciesService } from "@/services/species.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Fish, Thermometer } from "lucide-react";
import { useState } from "react";
import { columns } from "./components/columns";
import { DeleteDialog } from "@/components/dialogs/delete-dialog";
import { temperatureService } from "@/services/temperature.service";
import { TemperatureModel } from "@/interfaces/models/Temperature";
import { formatDateTime } from "@/utils/date-fns";
import { populateTemperatures } from "@/mocks/handlers/temperature";

export function TemperatureListScreen() {
  const qc = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryFn: () => temperatureService.getAll(),
    queryKey: ["temperatures"],
  });

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToBeDeleted, setItemToBeDeleted] =
    useState<TemperatureModel | null>(null);

  const { mutate: handleDelete, isPending: isDeleting } = useMutation({
    mutationFn: () => temperatureService.deleteById(itemToBeDeleted?.id!),
    onSuccess: () => {
      setIsDeleteOpen(false);
      toast({
        title: "Temperatura deletada com sucesso!",
        description: `A temperatura foi deletada com sucesso.`,
      });
      setItemToBeDeleted(null);
      qc.invalidateQueries({ queryKey: ["temperatures"] });
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  return (
    <>
      <div>
        <div className="w-full flex justify-between items-center">
          <PageHeader
            icon={Thermometer}
            title="Lista"
            path={["Sistema", "Configurações", "Temperatura"]}
          />
          <div className="space-x-2">
            <CreateButton />
            <PopulateButton
              onClick={() => {
                populateTemperatures();
                qc.invalidateQueries({ queryKey: ["temperatures"] });
              }}
            />
          </div>
        </div>{" "}
        <DataTable
          columns={columns}
          data={data}
          isLoading={isLoading}
          error={error?.message}
          onDelete={(item) => {
            setIsDeleteOpen(true);
            setItemToBeDeleted(item);
          }}
          hasClick
        />
      </div>

      <DeleteDialog
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Deletar temperatura"
        itemLabel={formatDateTime(itemToBeDeleted?.data)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </>
  );
}
