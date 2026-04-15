import { useRouter } from "next/router";

export function goToViewScreen(id: string) {
  const router = useRouter();

  router.push(`view/${id}`);
}
