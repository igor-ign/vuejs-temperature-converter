export function allowOnlyNumbers(text: string): string {
  return text.replace(/\D+/g, '')
}
