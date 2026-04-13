export interface RegisterUser {
  email: string;
  password: string;
  confirmPassword: string | null;
  nome: string;
  nomeEmpresa: string;
  cpfCnpj: string;
  ddd: string;
  telefone: string;
}
