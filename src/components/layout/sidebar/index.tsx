import { useSidebarStore } from "@/stores/sidebar-store";
import { useRouter } from "next/router";

type SidebarProps = {
  inDialog?: boolean;
};

export function Sidebar({ inDialog = false }: SidebarProps) {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);

  return (
    <div className={`${inDialog ? "block" : "lg:block hidden"}`}>
      <div
        className={`max-w-[236px] min-w-[236px] min-h-[94vh] h-full bg-white flex flex-col pt-8 ${
          !isSidebarOpen ? "hidden" : ""
        }`}
      ></div>
    </div>
  );
}
