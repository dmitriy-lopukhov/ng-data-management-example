export function getGenres(genres: string[]): string {
  return (genres && genres.join(", ")) || "-";
}
