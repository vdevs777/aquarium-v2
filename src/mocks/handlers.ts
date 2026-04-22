import { authHandlers } from "./handlers/auth";

import { brandHandlers } from "./handlers/brand";
import { fishFeedHandlers } from "./handlers/fish-feed";
import { productionUnitModelHandlers } from "./handlers/production-unit-model";
import { speciesHandlers } from "./handlers/species";
import { temperatureHandlers } from "./handlers/temperature";

import { usersHandlers } from "./handlers/users";

export const handlers = [
  ...authHandlers,

  // Admin
  ...usersHandlers,

  // Config
  ...productionUnitModelHandlers,
  ...brandHandlers,
  ...fishFeedHandlers,
  ...speciesHandlers,
  ...temperatureHandlers,
];
