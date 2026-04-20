import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Textarea, TextareaProps } from "@/components/ui/textarea";

interface TextareaControllerProps<T extends FieldValues> extends Omit<
  TextareaProps,
  "name"
> {
  control: Control<T>;
  name: Path<T>;
}

export function TextareaController<T extends FieldValues>({
  control,
  name,
  ...rest
}: TextareaControllerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState, formState }) => {
        const errorMessage = fieldState.error?.message;

        return (
          <div className="flex flex-col gap-1">
            <Textarea
              {...field}
              {...rest}
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
