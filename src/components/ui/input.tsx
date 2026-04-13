import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps extends React.ComponentProps<"input"> {
  error?: string;
  secureTextEntry?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, secureTextEntry, ...props }, ref) => {
    const hasError = !!error;
    const [showPassword, setShowPassword] = React.useState(false);

    const isPassword = secureTextEntry;
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          type={inputType}
          data-slot="input"
          aria-invalid={hasError}
          title={error}
          className={cn(
            "h-9 w-full min-w-0 text-black rounded-md border border-input bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground",
            "focus:border-primary focus:ring-4 ring-primary/10",
            hasError &&
              "border-destructive focus:border-destructive focus:ring-destructive/20",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            isPassword && "pr-10", // espaço pro botão
            className,
          )}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            tabIndex={-1} // evita conflito com tab do input
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
