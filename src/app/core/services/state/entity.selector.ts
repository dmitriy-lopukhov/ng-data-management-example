import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { State } from "./state.types";

export function getByPage<T>(): (
  source: Observable<[T[], State<T>]>
) => Observable<T[]> {
  return (source: Observable<[T[], State<T>]>): Observable<T[]> =>
    source.pipe(
      map(([movies, state]) =>
        movies.slice(getStartPosition(state), getEndPosition(state))
      )
    );
}

function getStartPosition<T>(state: State<T>): number {
  return (state.page - 1) * state.pageSize;
}

function getEndPosition<T>(state: State<T>): number | undefined {
  return state.page * state.pageSize;
}
