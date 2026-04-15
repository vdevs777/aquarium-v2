const crm = "/crm";
const operational = "/operational";
const admin = "/admin";
const config = "/config";

const production = operational + "/production";
const feeding = operational + "/feeding";

export const routes = {
  home: "/",
  profile: "/profile",
  login: "/login",
  signup: "/signup",
  forgot: "/forgot",
  customers: crm + "/customers",
  suppliers: crm + "/suppliers",
  unidadeProdutiva: production + "/unidade-produtiva",
  setorProdutivo: production + "/setor-produtivo",
  faseCultivo: production + "/fase-cultivo",
  alimentacao: feeding + "/alimentacao",
  loteProducao: feeding + "/lote-producao",
  loteRacao: feeding + "/lote-racao",
  planoAlimentar: feeding + "/plano-alimentar",
  users: admin + "/users",
  config: config,
  modeloUnidadeProdutiva: config + "/modelo-unidade-produtiva",
  marca: config + "/marca",
  racao: config + "/racao",
  especie: config + "/especie",
  temperatura: config + "/temperatura",
};
