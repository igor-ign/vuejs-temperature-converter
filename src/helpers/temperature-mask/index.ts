export function temperatureMask(text: string): string {
  return text.replace(/(?!^-)[^\d]/g, '')
}
