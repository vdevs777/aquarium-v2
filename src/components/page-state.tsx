import { Spinner } from "./ui/spinner";

type PageStateProps = {
  isValidId: boolean;
  isLoading: boolean;
  isReady: boolean;
  error: Error | null;
  loadingFallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
  invalidFallback?: React.ReactNode;
  children: React.ReactNode;
};

export function PageState({
  isValidId,
  isLoading,
  error,
  isReady,
  loadingFallback,
  errorFallback,
  invalidFallback,
  children,
}: PageStateProps) {
  if (!isReady) {
    return (
      loadingFallback ?? (
        <div className="flex justify-center mt-10">
          <Spinner />
        </div>
      )
    );
  }

  if (!isValidId) {
    return invalidFallback ?? <div>ID inválido</div>;
  }

  if (isLoading) {
    return (
      loadingFallback ?? (
        <div className="flex justify-center mt-10">
          <Spinner />
        </div>
      )
    );
  }

  if (error) {
    return (
      errorFallback ?? (
        <div className="text-red-500 mt-6 text-center">
          Erro ao carregar item.
        </div>
      )
    );
  }

  return <>{children}</>;
}
