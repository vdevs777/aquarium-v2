import { PersonModel } from "./Person";

export interface SupplierModel {
  id: number;
  pessoa: PersonModel;
  limiteDeCredito?: number | null;
  dataModificacao?: string | null;
  usuarioCriacao?: string | null;
  usuarioAtualizacao?: string | null;
}
