// import { PersonEntityType } from "@/interfaces/enums/PersonEntityType";
// import { customerSchema } from "@/schemas/customer-schema";
// import { personSchema } from "@/schemas/person-schema";
// import { supplierSchema } from "@/schemas/supplier-schema";
// import { z } from "zod";

// const schema = personSchema.merge(customerSchema).merge(supplierSchema);

// type Schema = z.infer<typeof schema>;

// export function formatPersonPayload(
//   data: Schema,
//   entityType: PersonEntityType,
// ) {
//   const { limiteDeCredito, ...pessoa } = data;

//   return {
//     pessoa,
//     ...(entityType === "customer"
//       ? { limiteDeCredito: limiteDeCredito ?? 0 }
//       : {}),
//     ...(entityType === "supplier" ? {} : {}),
//   };
// }
