import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, LucideIcon } from "lucide-react";

export interface InputProps extends React.ComponentProps<"input"> {
  error?: string;
  secureTextEntry?: boolean;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      error,
      secureTextEntry,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      ...props
    },
    ref,
  ) => {
    const hasError = !!error;
    const [showPassword, setShowPassword] = React.useState(false);

    const isPassword = secureTextEntry;
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    const hasRightElement = isPassword || RightIcon;

    return (
      <div className="relative w-full">
        {LeftIcon && (
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">
            <LeftIcon size={18} />
          </span>
        )}

        <input
          ref={ref}
          type={inputType}
          data-slot="input"
          aria-invalid={hasError}
          title={error}
          className={cn(
            "h-9 w-full min-w-0 text-black rounded-md border border-input bg-transparent py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground",
            "focus:border-primary focus:ring-4 ring-primary/10",
            hasError &&
              "border-destructive focus:border-destructive focus:ring-destructive/20",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",

            // padding dinâmico
            LeftIcon ? "pl-9" : "pl-2.5",
            hasRightElement ? "pr-10" : "pr-2.5",

            className,
          )}
          {...props}
        />

        {/* Right icon (custom) */}
        {RightIcon && !isPassword && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
            <RightIcon size={18} />
          </span>
        )}

        {/* Password toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            tabIndex={-1}
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
