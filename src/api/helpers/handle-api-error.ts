import { toast } from "@/hooks/useToast";

export type ApiErrorResponse = {
  title: string;
  status: number;
  detail?: string;
  instance?: string;
  traceId?: string;
};

export function handleApiError(error: unknown) {
  const maybeApiError = (error as any)?.response?.data;

  if (isApiErrorResponse(maybeApiError)) {
    const title = maybeApiError.detail || maybeApiError.title;

    const description =
      maybeApiError.detail && maybeApiError.detail !== maybeApiError.title
        ? maybeApiError.title
        : undefined;

    toast({
      title,
      description,
      variant: "destructive",
    });

    return;
  }

  if (isApiErrorResponse(error)) {
    const title = error.detail || error.title;

    toast({
      title,
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
