import {
  Boxes,
  Calendar,
  CircleDollarSign,
  Clock,
  DollarSign,
  Fish,
  House,
  LayoutDashboard,
  Package,
  RefreshCcw,
  Settings,
  Settings2,
  Shield,
  ShieldPlus,
  User,
  Wheat,
} from "lucide-react";
import { SidebarOpenButton } from "./buttons/sidebar-open-button";
import { SidebarSubButton } from "./buttons/sidebar-sub-button";
import { SidebarLabel } from "./sidebar-label";
import { SidebarButton } from "./buttons/sidebar-button";
import { useSidebarStore } from "@/stores/sidebar-store";
import { CollapsibleSidebarSubButton } from "./buttons/collapsible-sidebar-sub-button";
import { sectionColors } from "../section-colors";
import { primaryColorHEX } from "@/utils/primary-color";

type SidebarProps = {
  inDialog?: boolean;
};

export function Sidebar({ inDialog = false }: SidebarProps) {
  const { isSidebarOpen } = useSidebarStore();

  return (
    <div className={`${inDialog ? "block" : "xl:block hidden"}`}>
      <div
        className={`max-w-59.25 min-w-59.25 min-h-[92vh] h-full white flex gap-4 flex-col pt-8 gap-0w ${
          !isSidebarOpen ? "hidden" : ""
        }`}
      >
        <section
          className="pt-2 px-0 w-full flex flex-col gap-0"
          style={
            {
              "--sidebar-color": primaryColorHEX,
            } as React.CSSProperties
          }
        >
          <SidebarButton icon={House} path="/home" text="Início" />
        </section>

        <section
          className="pt-2 px-0 w-full flex flex-col gap-0"
          style={
            {
              "--sidebar-color": sectionColors.crm,
            } as React.CSSProperties
          }
        >
          <SidebarLabel text="CRM" />
          <SidebarOpenButton
            sectionName="customers"
            icon={User}
            text="Clientes"
            color={sectionColors.crm}
          >
            <SidebarSubButton text="Cadastrar" url="/crm/customers/create" />
            <SidebarSubButton text="Lista" url="/crm/customers/list" />
          </SidebarOpenButton>
          <SidebarOpenButton
            sectionName="suppliers"
            icon={Package}
            text="Fornecedores"
          >
            <SidebarSubButton text="Cadastrar" url="/crm/suppliers/create" />
            <SidebarSubButton text="Lista" url="/crm/suppliers/list" />
          </SidebarOpenButton>
        </section>
        <section
          className="pt-2 px-0 w-full flex flex-col gap-0"
          style={
            {
              "--sidebar-color": sectionColors.operational,
            } as React.CSSProperties
          }
        >
          <SidebarLabel text="OPERACIONAL" />

          <SidebarOpenButton
            sectionName="production"
            icon={Fish}
            text="Produção"
          >
            <CollapsibleSidebarSubButton
              subSectionName="production-unit"
              text="Unidade produtiva"
            >
              <SidebarSubButton
                text="Cadastrar"
                url="/operational/production/production-unit/create"
                insideCollapsible
              />
              <SidebarSubButton
                text="Análise"
                url="/operational/production/production-unit/analysis"
                insideCollapsible
              />
            </CollapsibleSidebarSubButton>

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
            <SidebarSubButton
              text="Setor produtivo"
              url="/operational/production/production-sector"
            />
          </SidebarOpenButton>

          <SidebarOpenButton
            sectionName="feeding"
            icon={Wheat}
            text="Alimentação"
          >
            <SidebarSubButton
              text="Painel"
              url="/operational/feeding/dashboard"
            />
            <CollapsibleSidebarSubButton
              subSectionName="fish-batch"
              text="Lote de produção"
            >
              <SidebarSubButton
                text="Lista"
                url="/operational/feeding/fish-batch/list"
                insideCollapsible
              />
              <SidebarSubButton
                text="Cadastrar"
                url="/operational/feeding/fish-batch/create"
                insideCollapsible
              />
            </CollapsibleSidebarSubButton>
            <CollapsibleSidebarSubButton
              subSectionName="fish-feed-batch"
              text="Lote de ração"
            >
              <SidebarSubButton
                text="Lista"
                url="/operational/feeding/fish-feed-batch/list"
                insideCollapsible
              />
              <SidebarSubButton
                text="Cadastrar"
                url="/operational/feeding/fish-feed-batch/create"
                insideCollapsible
              />
            </CollapsibleSidebarSubButton>
          </SidebarOpenButton>
        </section>
        <section
          className="pt-2 px-0 w-full flex flex-col gap-0"
          style={
            {
              "--sidebar-color": sectionColors.system,
            } as React.CSSProperties
          }
        >
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
