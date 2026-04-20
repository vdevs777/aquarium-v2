import { useRouter } from "next/router";
import { useMemo } from "react";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type UseValidatedNumberIdQueryProps<TData> = {
  queryKey: string[];
  queryFn: (id: number) => Promise<TData>;
  options?: Omit<UseQueryOptions<TData>, "queryKey" | "queryFn">;
};

export function useValidatedNumberIdQuery<TData>({
  queryKey,
  queryFn,
  options,
}: UseValidatedNumberIdQueryProps<TData>) {
  const router = useRouter();
  const { id } = router.query;
  const numericId = useMemo(() => {
    if (!router.isReady) return null;
    if (typeof id !== "string") return null;

    const parsed = Number(id);
    if (Number.isNaN(parsed)) return null;

    return parsed;
  }, [id, router.isReady]);
  const isValidId = useMemo(() => {
    if (numericId === null) return false;
    return Number.isInteger(numericId) && numericId > 0;
  }, [numericId]);
  const query = useQuery({
    queryKey: [...queryKey, numericId],
    queryFn: () => queryFn(numericId!),
    enabled: router.isReady && isValidId,
    ...options,
  });
  return { id: numericId, isReady: router.isReady, isValidId, ...query };
}
