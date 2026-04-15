import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginScreen } from "./login-screen";
import { useAuth } from "@/hooks/useAuth";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/hooks/useAuth");

describe("Login Screen", () => {
  it("should render inputs and submit button", () => {
    vi.mocked(useAuth).mockReturnValue({
      login: vi.fn(),
    } as any);

    render(<LoginScreen />);

    expect(screen.getByPlaceholderText("E-mail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /logar/i })).toBeInTheDocument();
  });

  it("should call login with filled data", async () => {
    const user = userEvent.setup();

    const loginMock = vi.fn();

    vi.mocked(useAuth).mockReturnValue({
      login: loginMock,
    } as any);

    render(<LoginScreen />);

    await user.type(screen.getByPlaceholderText("E-mail"), "teste@email.com");
    await user.type(screen.getByPlaceholderText("Senha"), "123456");

    await user.click(screen.getByRole("button", { name: /logar/i }));

    expect(loginMock.mock.calls[0][0]).toEqual({
      email: "teste@email.com",
      password: "123456",
    });
  });

  it("should not submit invalid form", async () => {
    const user = userEvent.setup();

    const loginMock = vi.fn();

    vi.mocked(useAuth).mockReturnValue({
      login: loginMock,
    } as any);

    render(<LoginScreen />);

    await user.click(screen.getByRole("button", { name: /logar/i }));

    expect(loginMock).not.toHaveBeenCalled();
  });
});
