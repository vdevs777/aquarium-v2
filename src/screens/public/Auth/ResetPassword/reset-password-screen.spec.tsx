import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ResetPasswordScreen } from "./reset-password-screen";

import { accountService } from "@/services/account.service";
import { toast } from "@/hooks/useToast";

const pushMock = vi.fn();

const useRouterMock = vi.fn();

vi.mock("next/router", () => ({
  useRouter: () => useRouterMock(),
}));

vi.mock("@/services/account.service", () => ({
  accountService: {
    resetPassword: vi.fn(),
  },
}));

vi.mock("@/hooks/useToast", () => ({
  toast: vi.fn(),
}));

describe("Reset Password Screen", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render inputs and submit button", () => {
    useRouterMock.mockReturnValue({
      query: {},
      push: pushMock,
    });

    render(<ResetPasswordScreen />);

    expect(screen.getByPlaceholderText("Nova senha")).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Confirmar nova senha"),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /trocar senha/i,
      }),
    ).toBeInTheDocument();
  });

  it("should call resetPassword with decoded token data", async () => {
    const user = userEvent.setup();

    const token = btoa(
      JSON.stringify({
        Email: "teste@email.com",
        Token: "token-123",
      }),
    );

    useRouterMock.mockReturnValue({
      query: {
        token,
      },
      push: pushMock,
    });

    vi.mocked(accountService.resetPassword).mockResolvedValue(undefined);

    render(<ResetPasswordScreen />);

    await user.type(screen.getByPlaceholderText("Nova senha"), "Senha@123");

    await user.type(
      screen.getByPlaceholderText("Confirmar nova senha"),
      "Senha@123",
    );

    await user.click(
      screen.getByRole("button", {
        name: /trocar senha/i,
      }),
    );

    await waitFor(() => {
      expect(accountService.resetPassword).toHaveBeenCalledWith({
        password: "Senha@123",
        confirmPassword: "Senha@123",
        email: "teste@email.com",
        token: "token-123",
      });
    });

    expect(toast).toHaveBeenCalled();

    expect(pushMock).toHaveBeenCalledWith("/login");
  });

  it("should not submit when passwords are different", async () => {
    const user = userEvent.setup();

    const token = btoa(
      JSON.stringify({
        Email: "teste@email.com",
        Token: "token-123",
      }),
    );

    useRouterMock.mockReturnValue({
      query: {
        token,
      },
      push: pushMock,
    });

    render(<ResetPasswordScreen />);

    await user.type(screen.getByPlaceholderText("Nova senha"), "Senha@123");

    await user.type(
      screen.getByPlaceholderText("Confirmar nova senha"),
      "Senha@321",
    );

    await user.click(
      screen.getByRole("button", {
        name: /trocar senha/i,
      }),
    );

    expect(accountService.resetPassword).not.toHaveBeenCalled();
  });

  it("should show error toast when token is missing", async () => {
    const user = userEvent.setup();

    useRouterMock.mockReturnValue({
      query: {},
      push: pushMock,
    });

    render(<ResetPasswordScreen />);

    await user.type(screen.getByPlaceholderText("Nova senha"), "Senha@123");

    await user.type(
      screen.getByPlaceholderText("Confirmar nova senha"),
      "Senha@123",
    );

    await user.click(
      screen.getByRole("button", {
        name: /trocar senha/i,
      }),
    );

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Token inválido",
        }),
      );
    });

    expect(accountService.resetPassword).not.toHaveBeenCalled();
  });

  it("should show error toast when token is invalid", async () => {
    const user = userEvent.setup();

    useRouterMock.mockReturnValue({
      query: {
        token: "invalid-token",
      },
      push: pushMock,
    });

    render(<ResetPasswordScreen />);

    await user.type(screen.getByPlaceholderText("Nova senha"), "Senha@123");

    await user.type(
      screen.getByPlaceholderText("Confirmar nova senha"),
      "Senha@123",
    );

    await user.click(
      screen.getByRole("button", {
        name: /trocar senha/i,
      }),
    );

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Token inválido",
        }),
      );
    });

    expect(accountService.resetPassword).not.toHaveBeenCalled();
  });
});
