import { ReactNode } from "react";

type FormBoxProps = {
  children: ReactNode;
};

export function FormBox({ children }: FormBoxProps) {
  return (
    <div className="bg-white rounded-sm w-full md:w-4/5 p-8 space-y-4">
      {children}
    </div>
  );
}
