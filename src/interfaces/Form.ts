export type FormProps<T> = {
  defaultValues?: T;
  mode?: FormMode;
};

export type FormMode = "create" | "update";
