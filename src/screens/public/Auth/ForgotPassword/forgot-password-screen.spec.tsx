import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";

import { ForgotPasswordScreen } from "./forgot-password-screen";

import { accountService } from "@/services/account.service";
import { toast } from "@/hooks/useToast";

const pushMock = vi.fn();

vi.mock("next/router", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

vi.mock("@/services/account.service", () => ({
  accountService: {
    forgotPassword: vi.fn(),
  },
}));

vi.mock("@/hooks/useToast", () => ({
  toast: vi.fn(),
}));

describe("Forgot Password Screen", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render email input and buttons", () => {
    render(<ForgotPasswordScreen />);

    expect(screen.getByPlaceholderText("E-mail")).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /recuperar minha senha/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /voltar para login/i,
      }),
    ).toBeInTheDocument();
  });

  it("should call forgotPassword and redirect to login", async () => {
    const user = userEvent.setup();

    vi.mocked(accountService.forgotPassword).mockResolvedValue(undefined);

    render(<ForgotPasswordScreen />);

    await user.type(screen.getByPlaceholderText("E-mail"), "teste@email.com");

    await user.click(
      screen.getByRole("button", {
        name: /recuperar minha senha/i,
      }),
    );

    await waitFor(() => {
      expect(accountService.forgotPassword).toHaveBeenCalledWith(
        "teste@email.com",
      );
    });

    expect(toast).toHaveBeenCalled();

    expect(pushMock).toHaveBeenCalledWith("/login");
  });

  it("should redirect to login when clicking back button", async () => {
    const user = userEvent.setup();

    render(<ForgotPasswordScreen />);

    await user.click(
      screen.getByRole("button", {
        name: /voltar para login/i,
      }),
    );

    expect(pushMock).toHaveBeenCalledWith("/login");
  });
});
