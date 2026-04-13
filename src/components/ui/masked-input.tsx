import { IMaskMixin } from "react-imask";
import { Input, InputProps } from "@/components/ui/input";
import React from "react";

type MaskedInputProps = InputProps & {
  mask: any;
};

const MaskedBase = IMaskMixin(({ inputRef, ...props }: any) => {
  return <Input {...props} ref={inputRef} />;
});

export const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  (props, ref) => {
    return <MaskedBase {...props} inputRef={ref} />;
  },
);

MaskedInput.displayName = "MaskedInput";
