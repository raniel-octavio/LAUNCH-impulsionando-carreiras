/**
 * Máscara e validação de telefone brasileiro.
 * Aceita fixo (10 dígitos) e celular (11 dígitos).
 * Formato final: (11) 98888-7777  ou  (11) 3333-4444
 */

export function maskPhoneBR(rawValue: string): string {
  const digits = rawValue.replace(/\D/g, "").slice(0, 11);

  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;

  const ddd = digits.slice(0, 2);
  const rest = digits.slice(2);

  if (rest.length <= 4) {
    return `(${ddd}) ${rest}`;
  }

  if (digits.length <= 10) {
    // Fixo: (11) 3333-4444
    const part1 = rest.slice(0, 4);
    const part2 = rest.slice(4, 8);
    return part2 ? `(${ddd}) ${part1}-${part2}` : `(${ddd}) ${part1}`;
  }

  // Celular: (11) 98888-7777
  const part1 = rest.slice(0, 5);
  const part2 = rest.slice(5, 9);
  return part2 ? `(${ddd}) ${part1}-${part2}` : `(${ddd}) ${part1}`;
}

export function unmaskPhone(maskedValue: string): string {
  return maskedValue.replace(/\D/g, "");
}

export function isValidPhoneBR(maskedValue: string): boolean {
  const digits = unmaskPhone(maskedValue);
  // 10 dígitos (fixo) ou 11 dígitos (celular, começando com 9 após o DDD)
  if (digits.length === 10) return true;
  if (digits.length === 11 && digits[2] === "9") return true;
  return false;
}