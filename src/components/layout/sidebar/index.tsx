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
  ShieldPlus,
  User,
} from "lucide-react";
import { SidebarOpenButton } from "./buttons/sidebar-open-button";
import { SidebarSubButton } from "./buttons/sidebar-sub-button";
import { SidebarLabel } from "./sidebar-label";
import { SidebarButton } from "./buttons/sidebar-button";
import { useSidebarStore } from "@/stores/sidebar-store";

type SidebarProps = {
  inDialog?: boolean;
};

export function Sidebar({ inDialog = false }: SidebarProps) {
  const { isSidebarOpen } = useSidebarStore();

  return (
    <div className={`${inDialog ? "block" : "xl:block hidden"}`}>
      <div
        className={`max-w-[237px] min-w-[237px] min-h-[92vh] h-full white flex flex-col pt-8 ${
          !isSidebarOpen ? "hidden" : ""
        }`}
      >
        <section className="pt-2 px-0 w-full">
          <SidebarLabel text="Sistema" />

          <SidebarButton icon={Settings} path="/config" text="Configurações" />
        </section>
      </div>
    </div>
  );
}
