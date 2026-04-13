import { MaskedOptions } from "imask";

// 📞 Telefone BR (fixo + celular automático)
export const phoneMask: MaskedOptions<any> = {
  mask: [
    {
      mask: "(00) 0000-0000", // fixo
    },
    {
      mask: "(00) 00000-0000", // celular (9 dígitos)
    },
  ],
};

// 🏢 CNPJ
export const cnpjMask: MaskedOptions<any> = {
  mask: "00.000.000/0000-00",
};

// 🔢 Número puro
export const numberMask: MaskedOptions<any> = {
  mask: Number,
};

// 🔧 remover máscara
export function unmask(value: string) {
  return value.replace(/\D/g, "");
}
