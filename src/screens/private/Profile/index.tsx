import { sectionColors } from "@/components/layout/section-colors";
import { PageHeader } from "@/components/page-header";
import { User } from "lucide-react";
import { InfoBox } from "./components/info-box";
import { ChangePasswordBox } from "./components/change-password-box";

export function ProfileScreen() {
  return (
    <div>
      <PageHeader title="Perfil" color={sectionColors.system} icon={User} />
      <div className="flex-row flex gap-4">
        <InfoBox />
        <ChangePasswordBox />
      </div>
    </div>
  );
}
