import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { Input, InputProps } from "@/components/ui/input";

interface InputControllerProps<T extends FieldValues> extends Omit<
  InputProps,
  "name"
> {
  control: Control<T>;
  name: Path<T>;
}

export function InputController<T extends FieldValues>({
  control,
  name,
  ...rest
}: InputControllerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState, formState }) => {
        const errorMessage = fieldState.error?.message;

        return (
          <div className="flex flex-col gap-1">
            <Input
              {...field}
              {...rest}
              error={errorMessage}
              disabled={formState.isSubmitting || rest.disabled}
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
