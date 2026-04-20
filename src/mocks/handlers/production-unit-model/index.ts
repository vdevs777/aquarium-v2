import { createProductionUnitModelHandler } from "./POST";

import {
  getProductionUnitModelHandler,
  getProductionUnitModelByIdHandler,
} from "./GET";

export const productionUnitModelHandlers = [
  createProductionUnitModelHandler,
  getProductionUnitModelHandler,
  getProductionUnitModelByIdHandler,
];
