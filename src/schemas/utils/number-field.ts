import z from "zod";
import { errorMessages } from "@/utils/error-messages";

type NumberFieldOptions = {
  max?: number;
  isInt?: boolean;
  allowZero?: boolean;
};

export const numberField = (options?: NumberFieldOptions) => {
  const { max, isInt, allowZero = true } = options || {};

  let schema = z
    .number({
      error: errorMessages.INVALID_VALUE,
    })
    .refine((val) => val !== undefined && val !== null, {
      message: errorMessages.REQUIRED,
    });

  schema = allowZero
    ? schema.min(0, { message: errorMessages.AMOUNT_MUST_BE_POSITIVE })
    : schema.gt(0, { message: errorMessages.AMOUNT_MUST_BE_POSITIVE });

  if (isInt) {
    schema = schema.int({ message: errorMessages.INVALID_VALUE });
  }

  if (max !== undefined) {
    schema = schema.max(max, { message: errorMessages.AMOUNT_TOO_LARGE });
  }

  return schema;
};
