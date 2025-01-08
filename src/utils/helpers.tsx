// Formats a date into a readable format (e.g., "2025-01-06")
export const formatDate = (date: string | Date): string => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  
  // Validates email format
  export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Converts an array of objects into a select-options format
  export const toSelectOptions = <T extends { id: number | string; label: string }>(
    items: T[]
  ): { value: number | string; label: string }[] => {
    return items.map((item) => ({
      value: item.id,
      label: item.label,
    }));
  };