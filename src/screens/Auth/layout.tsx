import Image from "next/image";
import { ReactNode } from "react";

type AuthLayoutProps = {
  title: string;
  children: ReactNode;
};

export function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <div className="flex flex-1 flex-row bg-white">
      <div className="hidden w-4/6 h-screen items-center justify-center flex-col lg:flex">
        <Image src="/logo.png" alt="Logo" width={419} height={55} />
      </div>
      <div className="flex text-white bg-gray-100 lg:bg-blue-950 w-full lg:w-2/6 h-screen items-center justify-center flex-col px-4 lg:px-8">
        <Image
          src="/logo.png"
          alt="Logo"
          width={260}
          height={40}
          className="lg:hidden block"
        />
        <div className="p-10 bg-white w-full max-w-[500px] rounded-md flex items-center flex-col mt-10">
          <h4 className="font-semibold text-gray-800 text-lg pb-10">{title}</h4>
          {children}
        </div>
      </div>
    </div>
  );
}
