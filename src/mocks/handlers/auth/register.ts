import { http } from "msw";
import { RegisterUser } from "@/interfaces/http/Auth/RegisterUser";
import { withDelay } from "@/mocks/utils/with-delay";

export const registerHandler = http.post(
  "*/register",
  withDelay(async ({ request }) => {
    const body = (await request.json()) as RegisterUser;

    const {
      email,
      password,
      confirmPassword,
      nome,
      nomeEmpresa,
      cpfCnpj,
      ddd,
      telefone,
    } = body;

    const error = (detail: string) =>
      Response.json(
        {
          title: "Erro de validação",
          status: 400,
          detail,
        },
        { status: 400 },
      );

    if (
      !email ||
      !password ||
      !nome ||
      !nomeEmpresa ||
      !cpfCnpj ||
      !ddd ||
      !telefone
    ) {
      return error("Preencha todos os campos obrigatórios.");
    }

    if (password !== confirmPassword) {
      return error("As senhas não coincidem.");
    }

    if (!/[A-Z]/.test(password)) {
      return error("A senha deve conter ao menos uma letra maiúscula.");
    }

    if (!/[0-9]/.test(password)) {
      return error("A senha deve conter ao menos um número.");
    }

    if (!/[^a-zA-Z0-9]/.test(password)) {
      return error("A senha deve conter ao menos um caractere especial.");
    }

    if (email === "admin@gmail.com") {
      return error("E-mail já está em uso.");
    }

    if (email === "pending@gmail.com") {
      return Response.json(
        {
          title: "Cadastro pendente",
          status: 201,
          detail:
            "Um e-mail de confirmação foi enviado. Verifique sua caixa de entrada.",
        },
        { status: 201 },
      );
    }

    return Response.json(
      {
        title: "Sucesso",
        status: 200,
        detail: "Empresa registrada com sucesso.",
      },
      { status: 200 },
    );
  }),
);
