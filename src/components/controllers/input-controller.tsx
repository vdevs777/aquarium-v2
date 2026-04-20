import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { Input, InputProps } from "@/components/ui/input";
import { MaskedInput } from "../ui/masked-input";

interface InputControllerProps<T extends FieldValues> extends Omit<
  InputProps,
  "name"
> {
  control: Control<T>;
  name: Path<T>;
  mask?: any;
}

export function InputController<T extends FieldValues>({
  control,
  name,
  mask,
  ...rest
}: InputControllerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState, formState }) => {
        const errorMessage = fieldState.error?.message;

        const Component = mask ? MaskedInput : Input;

        return (
          <div className="flex flex-col gap-1">
            <Component
              {...field}
              {...rest}
              onChange={(e) => {
                const value =
                  rest.type === "number"
                    ? e.target.valueAsNumber
                    : e.target.value;

                field.onChange(value);
              }}
              mask={mask}
              ref={field.ref}
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
