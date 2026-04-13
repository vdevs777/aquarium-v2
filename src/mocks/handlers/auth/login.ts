import { http } from "msw";
import { LoginSchema } from "@/schemas/login-schema";
import { withDelay } from "@/mocks/utils/with-delay";

export const loginHandler = http.post(
  "*/login",
  withDelay(async ({ request }) => {
    const body = (await request.json()) as LoginSchema;

    const { email, password } = body;

    if (email === "admin@gmail.com" && password === "admin@123") {
      return Response.json("mock-token");
    }

    const errorResponse = {
      title: "Credenciais inválidas",
      status: 401,
      detail: "Usuário ou senha estão incorretos.",
    };

    return Response.json(errorResponse, {
      status: errorResponse.status,
    });
  }),
);
