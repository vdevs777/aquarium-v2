import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  UserRound,
} from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import { useSidebarStore } from "@/stores/sidebar-store";
import { useState } from "react";

type HeaderProps = { showSheet: () => void };

export function Header({ showSheet }: HeaderProps) {
  const [isChangeIcon, setChangeIcon] = useState(true);

  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

  function changeIcon() {
    setChangeIcon(!isChangeIcon);
  }

  function actionsButton() {
    changeIcon();
    toggleSidebar();
  }

  const router = useRouter();
  return (
    <header className="w-full h-12 bg-white flex flex-row justify-between drop-shadow-sm z-50 pr-5">
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-row gap-4">
          <button
            className="hover:text-blue-400 hover:bg-white lg:block hidden pl-4"
            onClick={actionsButton}
          >
            {isChangeIcon ? (
              <ChevronLeft width={24} strokeWidth="1.5px" />
            ) : (
              <ChevronRight width={24} strokeWidth="1.5px" />
            )}
          </button>

          <button
            className="hover:text-blue-400 hover:bg-white lg:hidden block pl-4"
            onClick={showSheet}
          >
            <Menu width={24} strokeWidth="1.5px" />
          </button>
          <p className="font-bold xs:block hidden">Empresa</p>
        </div>
        <div className="flex flex-row lg:ml-[105px]">
          {/* {false ? (
            <Skeleton className="h-5 w-28" />
          ) : (
            <Select
              onValueChange={(value) => changeTenant(value)}
              defaultValue={
                tenant ? tenant : companies ? companies[0].id : "NULL"
              }
            >
              <SelectTrigger className="p-0 border-none">
                <SelectValue placeholder="Selecione uma empresa" />
              </SelectTrigger>
              <SelectContent>
                {companies?.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.nome}
                  </SelectItem>
                )) || (
                  <SelectItem value="NULL" disabled>
                    Nenhuma empresa encontrada
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          )} */}
        </div>
      </div>
      <div className="flex items-center font-normal flex-row-reverse gap-4">
        <Popover>
          <PopoverTrigger asChild className="hover: cursor-pointer gap-2">
            <div className="flex flex-row items-center hover:text-blue-400 gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src="https://ibaseminario.com.br/novo/wp-content/uploads/2013/09/default-avatar.png" />
              </Avatar>
              <span className="flex flex-row items-center text-sm text-slate-600 hover:text-blue-500">
                {/* {decodedToken?.email}{" "} */}
                email@email.com
                <ChevronDown strokeWidth="1.5px" width={17} />
              </span>
            </div>
          </PopoverTrigger>
          <PopoverContent className="h-auto p-0 bg-white w-auto" align="end">
            <div className="flex flex-row justify-center pt-2 gap-4">
              <Avatar>
                <AvatarImage src="https://ibaseminario.com.br/novo/wp-content/uploads/2013/09/default-avatar.png" />
              </Avatar>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-bold">email@email.com </p>
                <p className="text-sm text-gray-600">admin@email.com </p>
              </div>
            </div>
            <div className="flex flex-col start">
              <Button
                variant="ghost"
                className="justify-start items-center rounded-none hover:bg-primary/10 gap-2 h-9 ring-0"
                // onClick={() => router.push(routes.profile)}
              >
                <UserRound strokeWidth="1.5px" width={20} /> Perfil
              </Button>
              <Button
                variant="ghost"
                className="w-auto justify-start items-center rounded-none hover:bg-primary/10 gap-2 h-9"
                onClick={() => {
                  localStorage.removeItem("token");
                  sessionStorage.removeItem("tenant_id");
                  // router.push(routes.login);
                }}
              >
                <LogOut strokeWidth="1.5px" width={20} /> Sair
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        <div className="flex items-center flex-row-reverse gap-4">
          <Button
            variant="ghost"
            className="hover:bg-white hover:text-blue-500 p-0 text-slate-600"
          >
            <Bell strokeWidth="1.5px" width={20} />
          </Button>
        </div>
      </div>
    </header>
  );
}
