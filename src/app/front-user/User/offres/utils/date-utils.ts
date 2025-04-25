// src/app/backuser/offres/utils/date-utils.ts
export function formatDateFr(input: string | Date): string {
  const date = new Date(input);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'long'
  };
  return date.toLocaleDateString('fr-FR', options);
}
