export interface PersonModel {
  id: number;
  tipoPessoa: string;
  nome: string;
  nomeFantasia?: string | null;
  cpfCnpj: string;
  dataCriacao: string;
  dataNascimento?: string | null;
  generoId?: number | null;
  razaoSocial?: string | null;
  contribuinte?: boolean | null;
  inscricaoEstadual?: string | null;
  inscricaoMunicipal?: string | null;
  dataAbertura?: string | null;
  codigoUnico?: string | null;
  pessoaVinculadaId?: number | null;
  dataAtualizacao?: string | null;
  usuarioCriacao?: string | null;
  usuarioAtualizacao?: string | null;
  emails?: PersonEmailModel[] | null;
  enderecos?: PersonAddressModel[] | null;
  papeis?: PersonRoleModel[] | null;
  telefones?: PersonPhoneModel[] | null;
}

export interface PersonEmailModel {
  id: number;
  email: string;
  principal: boolean;
}

export interface PersonAddressModel {
  id: number;
  cidadeId: number;
  cep: string;
  bairro: string;
  logradouro: string;
  numero?: string | null;
  complemento?: string | null;
  referencia?: string | null;
  uf?: string | null;
  principal: boolean;
}

export interface PersonRoleModel {
  id: number;
  pessoaId: number;
  tipoPapelId: number;
  dataRegistro: string;
  statusId: number;
  dataAtualizacao?: string | null;
  usuarioCriacao?: string | null;
  usuarioAtualizacao?: string | null;
}

export interface PersonPhoneModel {
  id: number;
  ddd: string;
  numero: string;
  tipoTelefoneId: number;
  principal: boolean;
  ehWhatsApp: boolean;
}
