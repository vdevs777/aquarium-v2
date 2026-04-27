export type FeederPayload = {
  id: number;
  erro: number;
  hora: number;
  horaDesliga: number;
  horaLiga: number;
  minuto: number;
  modo: number;
  posicao: number;
  quantCiclos: number;
  quantReservatorio: number;
  setPoint: number;
  temperatura: number;
  tempoCiclo: number;
};

export type FeederItemPayload = {
  alimentador: FeederPayload;
};

export type FeederItemData = {
  data: FeederPayload;
};
