import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, Observable, of } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from "rxjs/operators";
import { getByPage } from "../../state/entity.selector";
import { EntityService } from "../../state/entity.service";
import { defaultPage, defaultPageSize } from "../../state/state.constants";
import { IMovie, MovieFilters } from "projects/shared-core/src/public-api";
import { filterMovies, sorByRating } from "./movie.selector";

@Injectable({
  providedIn: "root",
})
export class MovieService extends EntityService<IMovie> {
  private filters = new BehaviorSubject<MovieFilters>({});
  private readonly filters$ = this.filters.asObservable();
  private currentMovieId = new BehaviorSubject<number | null>(null);
  private readonly currentMovieId$ = this.currentMovieId.asObservable();
  public readonly total$ = this.state$.pipe(map((state) => state.total));
  public readonly loaded$ = this.state$.pipe(
    map((state) => state.loaded),
    distinctUntilChanged()
  );

  public readonly moviesByPage$ = combineLatest([
    this.state$.pipe(map((state) => Object.values(state.entries))),
    this.filters$,
  ]).pipe(
    debounceTime(0),
    filterMovies(),
    withLatestFrom(this.state$),
    getByPage()
  );
  public readonly end$ = combineLatest([
    this.moviesByPage$,
    this.state$.pipe(map((state) => state.total === state.pageSize)),
  ]).pipe(map(([movies, end]) => !movies.length || end));

  public readonly currentMovie$ = combineLatest([
    this.currentMovieId$,
    this.state$,
  ]).pipe(
    filter(([id]) => !!id),
    distinctUntilChanged(([id1], [id2]) => id1 === id2),
    switchMap(([id, state]) => {
      if (id) {
        return state.entries[id]
          ? of(state.entries[id])
          : this.getMoviesById(id);
      }
      return of(null);
    })
  );

  constructor(private httpClient: HttpClient) {
    super();
  }

  public loadMovies(): void {
    this.patchState({
      loading: true,
      loaded: false,
      total: 0,
      page: defaultPage,
      pageSize: defaultPageSize,
    });
    this.getMovies().subscribe((data) => this.setEntries(data));
  }

  public loadMore(): void {
    const { total, pageSize } = this.getState();
    if (total === pageSize) {
      return;
    }
    let newPageSize = pageSize + defaultPageSize;
    if (total < newPageSize) {
      newPageSize = total;
    }
    this.patchState({
      pageSize: newPageSize,
    });
  }

  public setFilters(filters: MovieFilters): void {
    const newState = { ...this.filters.getValue(), ...filters };
    this.filters.next(newState);
    this.patchState({ page: defaultPage, pageSize: defaultPageSize });
  }

  public getFilters(): MovieFilters {
    return this.filters.getValue();
  }

  private getMovies(): Observable<IMovie[]> {
    return this.httpClient
      .get<IMovie[]>("https://api.tvmaze.com/shows")
      .pipe(map((movies) => movies.sort(sorByRating)));
  }

  public setCurrentMovieId(id: number): void {
    this.currentMovieId.next(id);
  }

  private getMoviesById(id: number): Observable<IMovie> {
    return this.httpClient
      .get<IMovie>(`https://api.tvmaze.com/shows/${id}`)
      .pipe(tap((movie) => this.setEntry(movie)));
  }
}
