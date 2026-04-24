import { handleApiError } from "@/api/helpers/handle-api-error";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/useToast";
import { DialogProps } from "@/interfaces/DialogProps";
import { cultureStageService } from "@/services/culture-stage.service";
import { fishFeedService } from "@/services/fish-feed.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type FishFeedDialogProps = DialogProps;

export function FishFeedDialog({ open, onOpenChange }: FishFeedDialogProps) {
  const router = useRouter();
  const { id } = router.query;

  const qc = useQueryClient();

  const [selectedFishFeedId, setSelectedFishFeedId] = useState<string | null>(
    null,
  );

  const { data: fishFeeds } = useQuery({
    queryFn: () => fishFeedService.getAll(),
    queryKey: ["fish-feeds"],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      cultureStageService.addFeed(Number(id), Number(selectedFishFeedId!)),
    onSuccess: () => {
      onOpenChange(false);
      setSelectedFishFeedId(null);
      qc.invalidateQueries({ queryKey: ["culture-stage-fish-feeds", id] });
      toast({
        title: "Ração adicionada com sucesso!",
        description: "A ração foi adicionada com sucesso à fase de cultivo.",
      });
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  useEffect(() => {
    if (!open) {
      setSelectedFishFeedId(null);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-3">
        <DialogTitle>Adicionar ração</DialogTitle>
        <DialogDescription>
          Selecione a ração que você deseja adicionar.
        </DialogDescription>
        <Select
          onValueChange={setSelectedFishFeedId}
          value={selectedFishFeedId ?? undefined}
        >
          <SelectTrigger disabled={isPending}>
            <SelectValue placeholder="Selecione uma ração" />
          </SelectTrigger>
          <SelectContent side="bottom" className="h-80">
            {fishFeeds?.map((fishFeed) => (
              <SelectItem value={String(fishFeed.id)} key={fishFeed.id}>
                {fishFeed.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex flex-row justify-end gap-2">
          <Button
            disabled={!selectedFishFeedId}
            loading={isPending}
            onClick={() => mutate()}
          >
            Adicionar
          </Button>
          <Button
            variant="outline"
            disabled={isPending}
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
