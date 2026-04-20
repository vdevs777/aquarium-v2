type FormatNumberOptions = {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  fallback?: string;
};

export function formatNumber(value: unknown, options?: FormatNumberOptions) {
  const {
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
    fallback = "-",
  } = options || {};

  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  const number = Number(value);

  if (Number.isNaN(number)) {
    return fallback;
  }

  return number.toLocaleString("pt-BR", {
    minimumFractionDigits,
    maximumFractionDigits,
  });
}
