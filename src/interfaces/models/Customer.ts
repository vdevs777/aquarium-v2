import { PersonModel } from "./Person";

export interface CustomerModel {
  id: number;
  pessoa: PersonModel;
  limiteDeCredito?: number | null;
  dataModificacao?: string | null;
  usuarioCriacao?: string | null;
  usuarioAtualizacao?: string | null;
}
