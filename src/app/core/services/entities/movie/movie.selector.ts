import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { State } from "../../state/state.types";
import { IMovie, MovieFilters, Query } from "./movie.model";

export function moviesByPage(): (
  source: Observable<[IMovie[], State<IMovie>]>
) => Observable<IMovie[]> {
  return (
    source: Observable<[IMovie[], State<IMovie>]>
  ): Observable<IMovie[]> =>
    source.pipe(
      map(([movies, state]) =>
        movies
          .sort(sorByRating)
          .slice(getStartPosition(state), getEndPosition(state))
      )
    );
}

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

function sorByRating(a: IMovie, b: IMovie): number {
  return b.rating.average - a.rating.average;
}

function getStartPosition(state: State<IMovie>): number {
  return (state.page - 1) * state.pageSize;
}

function getEndPosition(state: State<IMovie>): number | undefined {
  return state.page * state.pageSize;
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
