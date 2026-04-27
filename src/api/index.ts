import axios from "axios";

import { env } from "@/env";
import { setToken } from "./helpers/set-token";

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
});

setToken(api);

export default api;
