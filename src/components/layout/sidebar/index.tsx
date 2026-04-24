import {
  Boxes,
  Calendar,
  CircleDollarSign,
  Clock,
  DollarSign,
  Fish,
  LayoutDashboard,
  RefreshCcw,
  Settings,
  Settings2,
  Shield,
  ShieldPlus,
  User,
} from "lucide-react";
import { SidebarOpenButton } from "./buttons/sidebar-open-button";
import { SidebarSubButton } from "./buttons/sidebar-sub-button";
import { SidebarLabel } from "./sidebar-label";
import { SidebarButton } from "./buttons/sidebar-button";
import { useSidebarStore } from "@/stores/sidebar-store";
import { CollapsibleSidebarSubButton } from "./buttons/collapsible-sidebar-sub-button";

type SidebarProps = {
  inDialog?: boolean;
};

export function Sidebar({ inDialog = false }: SidebarProps) {
  const { isSidebarOpen } = useSidebarStore();

  return (
    <div className={`${inDialog ? "block" : "xl:block hidden"}`}>
      <div
        className={`max-w-[237px] min-w-[237px] min-h-[92vh] h-full white flex gap-4 flex-col pt-8 gap-0w ${
          !isSidebarOpen ? "hidden" : ""
        }`}
      >
        <section className="pt-2 px-0 w-full flex flex-col gap-0">
          <SidebarLabel text="OPERACIONAL" />

          <SidebarOpenButton sectionName="admin" icon={Fish} text="Produção">
            <CollapsibleSidebarSubButton
              subSectionName="culture-stage"
              text="Fase de cultivo"
            >
              <SidebarSubButton
                text="Lista"
                url="/operational/production/culture-stage/list"
                insideCollapsible
              />
              <SidebarSubButton
                text="Cadastrar"
                url="/operational/production/culture-stage/create"
                insideCollapsible
              />
            </CollapsibleSidebarSubButton>
          </SidebarOpenButton>
        </section>
        <section className="pt-2 px-0 w-full flex flex-col gap-0">
          <SidebarLabel text="Sistema" />

          <SidebarOpenButton
            sectionName="admin"
            icon={Shield}
            text="Administração"
          >
            <SidebarSubButton text="Usuários" url="/admin/users" />
          </SidebarOpenButton>
          <SidebarButton icon={Settings} path="/config" text="Configurações" />
        </section>
      </div>
    </div>
  );
}
