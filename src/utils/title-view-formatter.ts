type TitleViewFormatterProps = {
  pageId: number | null;
  isLoading: boolean;
  isReady: boolean;
  error: Error | null;
  name: string;
  itemName?: string;
};

export function titleViewFormatter({
  pageId,
  isLoading,
  isReady,
  error,
  name,
  itemName,
}: TitleViewFormatterProps) {
  if (!isReady) return "Carregando...";

  return pageId === null
    ? "ID inválido"
    : isLoading
      ? "Carregando..."
      : error
        ? "Erro ao carregar item."
        : (itemName ?? name);
}
