import { format } from "date-fns";

export function formatDate(date: Date, formatString: string): string {
    return format(date, formatString);
}
