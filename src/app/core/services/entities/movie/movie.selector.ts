import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IMovie, MovieFilters, Query } from "./movie.model";

export function filterMovies(): (
  source: Observable<[IMovie[], MovieFilters]>
) => Observable<IMovie[]> {
  return (source: Observable<[IMovie[], MovieFilters]>): Observable<IMovie[]> =>
    source.pipe(
      map(([movies, filters]) =>
        Object.keys(filters).length
          ? movies.filter((i) => filterByQuery(i, filters.query))
          : movies
      )
    );
}

export function sorByRating(a: IMovie, b: IMovie): number {
  return b.rating.average - a.rating.average;
}

function filterByQuery(i: IMovie, query: Query): boolean {
  return (
    i &&
    query !== undefined &&
    (!!(i.name && i.name.toLowerCase().includes(query.toLowerCase())) ||
      !!(
        i.genres &&
        i.genres.join(",").toLowerCase().includes(query.toLowerCase())
      ))
  );
}
