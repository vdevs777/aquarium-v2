import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectControllerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
  contentClassName?: string;
  loading?: boolean;
}

export function SelectController<T extends FieldValues>({
  control,
  name,
  placeholder,
  options,
  disabled,
  contentClassName,
  loading,
}: SelectControllerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState, formState }) => {
        const errorMessage = fieldState.error?.message;

        return (
          <div className="flex flex-col gap-1">
            <Select
              value={field.value ? String(field.value) : ""}
              onValueChange={(value) => field.onChange(Number(value))}
              disabled={formState.isSubmitting || disabled}
            >
              <SelectTrigger error={errorMessage} loading={loading}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>

              <SelectContent
                position="popper"
                align="start"
                className={contentClassName}
              >
                {options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errorMessage && (
              <span className="text-xs text-red-500">{errorMessage}</span>
            )}
          </div>
        );
      }}
    />
  );
}
