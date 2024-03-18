export function convertToSlug(input: string): string {
    return input
        .replace(/[^\w\s-+#]/g, "")
        .trim()
        .replace(/[-\s]+/g, "-")
        .replace(/#/g, "-sharp")
        .replace(/\+/g, "-plus")
        .toLowerCase();
}
