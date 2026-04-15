import { PageHeader } from "@/components/page-header";
import { LayoutDashboard } from "lucide-react";
import colors from "tailwindcss/colors";

export default function Home() {
  return (
    <PageHeader
      icon={LayoutDashboard}
      title="Painel"
      path={["Teste", "Teste2"]}
    />
  );
}
