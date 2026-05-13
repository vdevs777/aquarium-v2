import {
  Activity,
  AlertTriangle,
  Fish,
  FlaskConical,
  House,
  LayoutDashboard,
  Package,
  Scale,
  Wheat,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";

export default function Home() {
  return (
    <div className="space-y-6">
      <PageHeader title="Início" icon={House} />
      <Card className="bg-white">
        <CardContent className="flex flex-col justify-between gap-4 p-6 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-black">
              AQUARIUM: Sistema de Gestão Piscícola
            </h1>

            <p className="mt-2 text-muted-foreground">
              Controle produção, alimentação e crescimento dos lotes.
            </p>
          </div>

          <Fish className="size-16 text-primary" />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Tanques ativos"
          value="12"
          icon={Fish}
          color="text-cyan-500"
        />

        <DashboardCard
          title="Lotes em cultivo"
          value="8"
          icon={Activity}
          color="text-green-500"
        />

        <DashboardCard
          title="Ração consumida"
          value="420kg"
          icon={Wheat}
          color="text-orange-500"
        />

        <DashboardCard
          title="Biomassa estimada"
          value="2.4t"
          icon={Scale}
          color="text-blue-500"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Atividades recentes</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <ActivityItem
              title="Nova alimentação registrada"
              description="Tanque T-12 • 18kg de ração"
            />

            <ActivityItem title="Biometria concluída" description="Lote #203" />

            <ActivityItem
              title="Novo lote cadastrado"
              description="Unidade Norte"
            />

            <ActivityItem
              title="Análise da água realizada"
              description="pH e oxigenação normal"
            />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resumo do dia</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 text-sm">
              <SummaryItem label="Alimentações realizadas" value="14" />

              <SummaryItem label="Biometrias pendentes" value="3" />

              <SummaryItem label="Análises de água" value="6" />

              <SummaryItem label="Alertas" value="2" danger />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acesso rápido</CardTitle>
            </CardHeader>

            <CardContent className="grid gap-3">
              <QuickButton icon={Package} label="Novo lote" />

              <QuickButton icon={Wheat} label="Registrar alimentação" />

              <QuickButton icon={FlaskConical} label="Análise da água" />

              <QuickButton icon={AlertTriangle} label="Registrar ocorrência" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

type DashboardCardProps = {
  title: string;
  value: string;
  icon: any;
  color: string;
};

function DashboardCard({
  title,
  value,
  icon: Icon,
  color,
}: DashboardCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6 py-0">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>

          <h2 className="mt-2 text-3xl font-bold">{value}</h2>
        </div>

        <div className="rounded-2xl bg-muted p-3">
          <Icon className={`size-7 ${color}`} />
        </div>
      </CardContent>
    </Card>
  );
}

type ActivityItemProps = {
  title: string;
  description: string;
};

function ActivityItem({ title, description }: ActivityItemProps) {
  return (
    <div className="flex items-start justify-between rounded-xl border p-4">
      <div>
        <p className="font-medium">{title}</p>

        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <span className="text-xs text-muted-foreground">agora</span>
    </div>
  );
}

type SummaryItemProps = {
  label: string;
  value: string;
  danger?: boolean;
};

function SummaryItem({ label, value, danger }: SummaryItemProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>

      <span className={`font-semibold ${danger ? "text-red-500" : ""}`}>
        {value}
      </span>
    </div>
  );
}

type QuickButtonProps = {
  label: string;
  icon: any;
};

function QuickButton({ label, icon: Icon }: QuickButtonProps) {
  return (
    <Button variant="outline" className="justify-start gap-2">
      <Icon className="size-4" />

      {label}
    </Button>
  );
}
