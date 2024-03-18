export class IdGenerator {
    private static readonly Existing = new Set<string>();
    private static readonly MaxSize: number = 8;

    static generateId(): string {
        let value = "";

        while (!value || IdGenerator.Existing.has(value)) {
            value = generateHash(IdGenerator.MaxSize);
        }

        IdGenerator.Existing.add(value);

        return value;
    }
}

const allCharacters: string =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-0123456789";

function generateHash(maxSize: number): string {
    let result = "";

    for (let i = 0; i < maxSize; i++) {
        result += allCharacters.charAt(
            Math.floor(Math.random() * allCharacters.length)
        );
    }

    return result;
}
