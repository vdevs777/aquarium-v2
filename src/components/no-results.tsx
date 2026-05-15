import { TableCell, TableRow } from "./ui/table";

type NoResultsProps = {
  colSpan: number;
};

export function NoResults({ colSpan }: NoResultsProps) {
  return (
    <TableRow>
      <TableCell
        colSpan={colSpan}
        className="h-12 text-center text-muted-foreground"
      >
        Não foram encontrados resultados
      </TableCell>
    </TableRow>
  );
}
