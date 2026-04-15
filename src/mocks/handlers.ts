import { authHandlers } from "./handlers/auth";
import { productionUnitModelHandlers } from "./handlers/production-unit-model";

export const handlers = [...authHandlers, ...productionUnitModelHandlers];
