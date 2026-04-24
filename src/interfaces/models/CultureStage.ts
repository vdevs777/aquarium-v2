export interface CultureStageModel {
  id: number;
  nome: string;
  pesoInicial: number;
  pesoFinal: number;
  ganhoPesoDia: number;
  percentualMortalidade: number;
  diasCultivo: number;
  densidadeM3: number;
  kgPorM3: number;
  frequenciaAlimentar: number | null;
  fatorConversaoAlimentarEsperado: number;
  volumeM3: number;
  cor: string | null;
}
