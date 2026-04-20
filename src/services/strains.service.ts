import api from "@/api";
import { StrainModel } from "@/interfaces/models/Strain";
import { StrainSchema } from "@/schemas/strain-schema";

async function getAll() {
  const { data } = await api.get<StrainModel[]>("/especies/linhagens");
  return data;
}

async function getStrainsFromSpecies(speciesId: number) {
  const { data } = await api.get<StrainModel[]>(
    `/especies/${speciesId}/linhagens`,
  );
  return data;
}

async function createStrainOnSpecies(speciesId: number, request: StrainSchema) {
  // PROVISORY
  const payload: StrainModel = {
    ...request,
    especieId: speciesId,
    especieNome: "",
    id: 0,
  };

  const { data } = await api.post<StrainModel>(
    `/especies/${speciesId}/linhagens`,
    payload,
  );
  return data;
}

async function getStrainFromSpeciesById(speciesId: number, strainId: number) {
  const { data } = await api.get<StrainModel>(
    `/especies/${speciesId}/linhagens/${strainId}`,
  );
  return data;
}

async function updateStrainOnSpecies(
  speciesId: number,
  strainId: number,
  request: StrainSchema,
) {
  // PROVISORY
  const payload: StrainModel = {
    ...request,
    especieId: speciesId,
    especieNome: "",
    id: strainId,
  };

  await api.put<StrainModel>(
    `/especies/${speciesId}/linhagens/${strainId}`,
    payload,
  );
}

async function deleteStrainOnSpecies(speciesId: number, strainId: number) {
  await api.delete(`/especies/${speciesId}/linhagens/${strainId}`);
}

export const strainsService = {
  getAll,
  getStrainsFromSpecies,
  createStrainOnSpecies,
  updateStrainOnSpecies,
  getStrainFromSpeciesById,
  deleteStrainOnSpecies,
};
