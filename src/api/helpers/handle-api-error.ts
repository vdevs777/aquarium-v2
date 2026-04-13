import { toast } from "@/hooks/useToast";

export type ApiErrorResponse = {
  title: string;
  status: number;
  detail?: string;
  instance?: string;
  traceId?: string;
};

export function handleApiError(error: unknown) {
  const err = error as any;

  const data = err?.response?.data ?? err?.data ?? err;

  if (isApiErrorResponse(data)) {
    const title = data.detail || data.title;

    const description =
      data.detail && data.detail !== data.title ? data.title : undefined;

    toast({
      title,
      description,
      variant: "destructive",
    });

    return;
  }

  toast({
    title: "Erro inesperado",
    description: "Tente novamente mais tarde.",
    variant: "destructive",
  });
}

function isApiErrorResponse(data: any): data is ApiErrorResponse {
  return (
    data &&
    typeof data === "object" &&
    typeof data.title === "string" &&
    typeof data.status === "number"
  );
}
