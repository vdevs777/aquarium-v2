import { PropsWithChildren, useState } from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

export function Layout({ children }: PropsWithChildren) {
  const [isShowSheet, setIsShowSheet] = useState(false);

  function showSheet() {
    setIsShowSheet(!isShowSheet);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header showSheet={showSheet} />
      <div className="flex flex-1">
        <Sidebar />
        <Sheet open={isShowSheet} onOpenChange={setIsShowSheet}>
          <SheetTrigger asChild></SheetTrigger>
          <SheetContent side="left" className="mt-12 p-0 w-[236px] h-full">
            <Sidebar inDialog />
          </SheetContent>
        </Sheet>
        <div className="p-5 bg-gray-50 w-full">{children}</div>
      </div>
      <footer className="bg-white h-auto text-xs py-1 flex items-center justify-center">
        © 2024-2026 IotarJR - Versão: xxx-xxx
      </footer>
    </div>
  );
}
