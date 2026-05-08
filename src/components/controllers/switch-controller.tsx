import {
  Control,
  Controller,
  FieldValues,
  Path,
  useFormContext,
} from "react-hook-form";

import { Switch } from "@/components/ui/switch";

interface SwitchControllerProps<T extends FieldValues> {
  control?: Control<T>;
  name: Path<T>;
  disabled?: boolean;
  size?: "sm" | "default";
}

export function SwitchController<T extends FieldValues>({
  control,
  name,
  disabled,
  size = "default",
}: SwitchControllerProps<T>) {
  const form = useFormContext<T>();

  const formControl = control ?? form.control;

  return (
    <Controller
      control={formControl}
      name={name}
      render={({ field, fieldState, formState }) => {
        const errorMessage = fieldState.error?.message;

        return (
          <div className="flex flex-col gap-1">
            <Switch
              checked={!!field.value}
              onCheckedChange={field.onChange}
              disabled={formState.isSubmitting || disabled}
              ref={field.ref}
              size={size}
              aria-invalid={!!errorMessage}
            />

            {errorMessage && (
              <span className="text-xs text-red-500">{errorMessage}</span>
            )}
          </div>
        );
      }}
    />
  );
}
