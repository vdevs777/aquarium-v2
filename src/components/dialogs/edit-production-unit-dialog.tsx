// import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { getModelos } from "@/api/services/config/modelo";
// import { useQuery } from "@tanstack/react-query";
// import { ErrorSelect } from "../select/error-select";
// import { LoadingSelect } from "../select/loading-select";
// import { NoResultsSelect } from "../select/no-results-select";
// import {
//   unidadeProdutivaSchema,
//   UnidadeProdutivaSchema,
// } from "@/schemas/unidade-produtiva-schema";
// import { Label } from "../ui/label";
// import { SubmitButton } from "../submit-button";
// import {
//   getTipoAlimentacaoList,
//   getTipoAlimentacaoName,
//   TipoAlimentacao,
// } from "@/enums/tipo-de-alimentacao";
// import { useEffect } from "react";

// interface EditProductionUnitDialogProps {
//   onSubmit: (data: UnidadeProdutivaSchema) => Promise<void>;
//   showSequencia: boolean;
//   defaultValues: UnidadeProdutivaSchema;
//   enabled: boolean;
// }

// export function EditProductionUnitDialog({
//   onSubmit,
//   defaultValues,
//   enabled,
// }: EditUnidadeDialogProps) {
//   const {
//     data: modelos,
//     isLoading: isLoadingModelos,
//     error: errorModelos,
//   } = useQuery({
//     queryKey: ["modelos"],
//     queryFn: getModelos,
//     enabled: enabled,
//     // staleTime: Infinity,
//   });

//   const {
//     register,
//     setValue,
//     handleSubmit,
//     watch,
//     formState: { errors, isSubmitting },
//   } = useForm<UnidadeProdutivaSchema>({
//     resolver: zodResolver(unidadeProdutivaSchema),
//     defaultValues: {
//       ...defaultValues,
//       codigoAlimentador:
//         defaultValues.tipoAlimentacaoId === TipoAlimentacao.Automatico
//           ? defaultValues.codigoAlimentador
//           : null,
//       tipoAlimentacaoId:
//         defaultValues.tipoAlimentacaoId ?? TipoAlimentacao.Manual,
//     },
//   });

//   const tipoAlimentacaoId = watch("tipoAlimentacaoId") as TipoAlimentacao;

//   useEffect(() => {
//     if (tipoAlimentacaoId === TipoAlimentacao.Manual) {
//       setValue("codigoAlimentador", null, { shouldValidate: true });
//     }
//   }, [tipoAlimentacaoId, setValue]);

//   return (
//     <DialogContent>
//       <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <Label htmlFor="codigo">Código</Label>
//           <Input
//             id="codigo"
//             disabled={isSubmitting}
//             error={errors.codigo?.message}
//             {...register("codigo")}
//           />
//         </div>
//         <div>
//           <Label htmlFor="modeloUnidadeProdutivaId">
//             Modelo de unidade produtiva
//           </Label>
//           <Select
//             onValueChange={(val) =>
//               setValue("modeloUnidadeProdutivaId", Number(val), {
//                 shouldValidate: true,
//               })
//             }
//             defaultValue={String(defaultValues.modeloUnidadeProdutivaId)}
//           >
//             <SelectTrigger
//               id="modeloUnidadeProdutivaId"
//               disabled={isSubmitting}
//               error={errors.modeloUnidadeProdutivaId?.message}
//             >
//               <SelectValue placeholder="Informe o modelo de unidade produtiva" />
//             </SelectTrigger>
//             <SelectContent>
//               {errorModelos ? (
//                 <ErrorSelect />
//               ) : isLoadingModelos ? (
//                 <LoadingSelect />
//               ) : modelos?.length === 0 ? (
//                 <NoResultsSelect />
//               ) : (
//                 modelos?.map((item) => (
//                   <SelectItem value={String(item.id)}>{item.nome}</SelectItem>
//                 ))
//               )}
//             </SelectContent>
//           </Select>
//         </div>
//         <div>
//           <Label htmlFor="sequencia">Sequência</Label>
//           <Input
//             id="sequencia"
//             type="number"
//             min="1"
//             step="1"
//             disabled={isSubmitting}
//             error={errors.sequencia?.message}
//             {...register("sequencia", { valueAsNumber: true })}
//           />
//         </div>
//         <div>
//           <Label htmlFor="modeloUnidadeProdutivaId">Tipo de alimentação</Label>
//           <Select
//             onValueChange={(val) =>
//               setValue("tipoAlimentacaoId", Number(val), {
//                 shouldValidate: true,
//               })
//             }
//             defaultValue={
//               String(defaultValues.tipoAlimentacaoId) ??
//               String(TipoAlimentacao.Manual)
//             }
//           >
//             <SelectTrigger
//               id="tipoAlimentacaoId"
//               disabled={isSubmitting}
//               error={errors.tipoAlimentacaoId?.message}
//             >
//               <SelectValue placeholder="Informe o tipo de alimentação" />
//             </SelectTrigger>
//             <SelectContent>
//               {getTipoAlimentacaoList().map((item) => (
//                 <SelectItem value={String(item.value)}>{item.name}</SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//         {tipoAlimentacaoId === TipoAlimentacao.Automatico && (
//           <div>
//             <Label htmlFor="codigoAlimentador">Alimentador (código)</Label>
//             <Input
//               id="codigoAlimentador"
//               disabled={isSubmitting}
//               error={errors.codigoAlimentador?.message}
//               {...register("codigoAlimentador")}
//             />
//           </div>
//         )}
//         <SubmitButton isEdit isSubmitting={isSubmitting} />
//       </form>
//     </DialogContent>
//   );
// }
