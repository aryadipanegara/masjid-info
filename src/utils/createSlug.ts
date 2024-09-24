export function createSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // Menghapus karakter non-alfanumerik
    .trim()
    .replace(/\s+/g, "-"); // Mengganti spasi dengan tanda hubung
}
