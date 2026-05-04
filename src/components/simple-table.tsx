import { LucideIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Table, TableBody, TableCell, TableRow } from "./ui/table";

import { cn } from "@/lib/utils";
import { useRouter } from "next/router";

type DataTableItem = {
  id: number | string;
  label: string;
  value: string | number;
};

type SimpleTableProps = {
  title: string;
  icon: LucideIcon;
  data: DataTableItem[];
  redirectTo?: (item: DataTableItem) => string;
  emptyMessage?: string;
  defaultOpen?: boolean;
};

export function SimpleTable({
  title,
  icon: Icon,
  data,
  redirectTo,
  emptyMessage = "Nenhum dado encontrado.",
  defaultOpen = true,
}: SimpleTableProps) {
  const router = useRouter();

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultOpen ? title : undefined}
      className="w-full rounded-md"
    >
      <AccordionItem
        value={title}
        className="border border-input rounded-md bg-white"
      >
        <AccordionTrigger className="px-4 py-2 border-b hover:no-underline">
          <div className="flex items-center gap-2 font-semibold text-black">
            <Icon size={18} />
            {title}
          </div>
        </AccordionTrigger>

        <AccordionContent className="pb-0">
          <Table className="w-full rounded-md">
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={2}
                    className="text-center border-t text-sm text-muted-foreground py-2"
                  >
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item, index) => (
                  <TableRow key={index} className="border-t">
                    <TableCell
                      className={cn(
                        "font-medium",
                        redirectTo
                          ? "text-blue-600 hover:underline cursor-pointer"
                          : "text-black",
                      )}
                      onClick={
                        redirectTo
                          ? () => router.push(redirectTo(item))
                          : undefined
                      }
                    >
                      {item.label}
                    </TableCell>
                    <TableCell className="text-right">{item.value}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
