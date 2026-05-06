import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, LucideIcon } from "lucide-react";

type Decorator = LucideIcon | string;

export interface InputProps extends React.ComponentProps<"input"> {
  error?: string;
  secureTextEntry?: boolean;
  leftDecorator?: Decorator;
  rightIcon?: LucideIcon;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      error,
      secureTextEntry,
      leftDecorator,
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

    const renderLeftDecorator = () => {
      if (!leftDecorator) return null;

      if (typeof leftDecorator === "string") {
        return <span className="text-sm">{leftDecorator}</span>;
      }

      const Icon = leftDecorator;
      return <Icon size={18} />;
    };

    return (
      <div className="relative w-full">
        {leftDecorator && (
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground flex items-center">
            {renderLeftDecorator()}
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

            leftDecorator ? "pl-9" : "pl-2.5",
            hasRightElement ? "pr-10" : "pr-2.5",

            className,
          )}
          {...props}
        />

        {RightIcon && !isPassword && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
            <RightIcon size={18} />
          </span>
        )}

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
