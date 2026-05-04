import { History as HistoryLucide } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";

type HistoryProps = {
  items: {
    userName: string;
    header: string;
    date: string;
    details?: string;
    description?: string;
  }[];
};

export function History({ items }: HistoryProps) {
  return (
    <div className="bg-white w-full p-4 rounded-md border space-y-4">
      <div className="flex items-center gap-2">
        <HistoryLucide size={18} />
        <h5 className="font-semibold text-sm">Histórico</h5>
      </div>

      <ScrollArea className="h-96 pr-3">
        <div className="relative space-y-4">
          {/* linha da timeline */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-zinc-200" />

          {items.map((item, index) => (
            <div key={index} className="flex gap-3 relative">
              {/* avatar + ponto */}
              <div className="relative">
                <Avatar className="w-10 h-10 border bg-white">
                  <AvatarFallback className="bg-primary text-white text-sm uppercase">
                    {item.userName[0]}
                  </AvatarFallback>
                </Avatar>

                {/* ponto da linha */}
              </div>

              {/* conteúdo */}
              <div className="flex flex-col w-full bg-zinc-50 border rounded-md p-3">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex flex-wrap gap-1 text-sm">
                    <b className="text-zinc-900">{item.userName}</b>
                    <span className="text-zinc-600">{item.header}</span>
                  </div>

                  <span className="text-xs text-zinc-400 whitespace-nowrap">
                    {item.date}
                  </span>
                </div>

                {item.details && (
                  <p className="text-zinc-500 mt-1 text-sm">{item.details}</p>
                )}

                {item.description && (
                  <p className="text-zinc-500 mt-1 text-sm">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
