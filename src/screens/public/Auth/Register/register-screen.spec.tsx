import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegisterScreen } from "./register-screen";
import { useAuth } from "@/hooks/useAuth";
import { describe, expect, it, vi } from "vitest";
import { unmask } from "@/utils/masks";

vi.mock("@/hooks/useAuth");

describe("Register Screen", () => {
  it("should render all inputs and submit button", () => {
    vi.mocked(useAuth).mockReturnValue({
      register: vi.fn(),
    } as any);

    render(<RegisterScreen />);

    expect(screen.getByPlaceholderText("Responsável")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nome da empresa")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("CNPJ")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Telefone")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("E-mail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirmar senha")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /registrar/i }),
    ).toBeInTheDocument();
  });

  it("should call register with filled data", async () => {
    const user = userEvent.setup();

    const registerMock = vi.fn();

    vi.mocked(useAuth).mockReturnValue({
      register: registerMock,
    } as any);

    render(<RegisterScreen />);

    await user.type(screen.getByPlaceholderText("Responsável"), "João Silva");
    await user.type(
      screen.getByPlaceholderText("Nome da empresa"),
      "Empresa LTDA",
    );
    await user.type(screen.getByPlaceholderText("CNPJ"), "12345678000199");
    await user.type(screen.getByPlaceholderText("Telefone"), "31999999999");
    await user.type(screen.getByPlaceholderText("E-mail"), "teste@email.com");
    await user.type(screen.getByPlaceholderText("Senha"), "Senha@123");
    await user.type(
      screen.getByPlaceholderText("Confirmar senha"),
      "Senha@123",
    );

    await user.click(screen.getByRole("button", { name: /registrar/i }));

    const data = registerMock.mock.calls[0][0];

    expect(data.nome).toBe("João Silva");
    expect(data.nomeEmpresa).toBe("Empresa LTDA");
    expect(data.email).toBe("teste@email.com");

    expect(unmask(data.cpfCnpj)).toBe("12345678000199");
    expect(unmask(data.telefone)).toBe("31999999999");

    expect(data.password).toBe("Senha@123");
    expect(data.confirmPassword).toBe("Senha@123");
  });

  it("should not submit invalid form", async () => {
    const user = userEvent.setup();

    const registerMock = vi.fn();

    vi.mocked(useAuth).mockReturnValue({
      register: registerMock,
    } as any);

    render(<RegisterScreen />);

    await user.click(screen.getByRole("button", { name: /registrar/i }));

    expect(registerMock).not.toHaveBeenCalled();
  });
});
