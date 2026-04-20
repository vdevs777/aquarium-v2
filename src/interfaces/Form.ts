export type FormProps<T> = {
  defaultValues?: T;
  mode?: FormMode;
  formBoxClassName?: string;
};

export type FormMode = "create" | "update";
