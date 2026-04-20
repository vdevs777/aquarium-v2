import { authHandlers } from "./handlers/auth";

import { brandHandlers } from "./handlers/brand";
import { fishFeedHandlers } from "./handlers/fish-feed";
import { productionUnitModelHandlers } from "./handlers/production-unit-model";
import { speciesHandlers } from "./handlers/species";

export const handlers = [
  ...authHandlers,

  // Config
  ...productionUnitModelHandlers,
  ...brandHandlers,
  ...fishFeedHandlers,
  ...speciesHandlers,
];
