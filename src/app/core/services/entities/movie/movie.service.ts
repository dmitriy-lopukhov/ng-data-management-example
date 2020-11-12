import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, Observable, of } from "rxjs";
import { map, withLatestFrom } from "rxjs/operators";
import { EntityService } from "../../state/entity.service";
import { IMovie, MovieFilters } from "./movie.model";
import { filterMovies, moviesByPage } from "./movie.selector";

@Injectable({
  providedIn: "root",
})
export class MovieService extends EntityService<IMovie> {
  private filters = new BehaviorSubject<MovieFilters>({});
  private readonly filters$ = this.filters.asObservable();
  public readonly total$ = this.state$.pipe(map((state) => state.total));

  public readonly moviesByPage$ = combineLatest([
    this.state$.pipe(map((state) => Object.values(state.entries))),
    this.filters$,
  ]).pipe(filterMovies(), withLatestFrom(this.state$), moviesByPage());

  constructor(private httpClient: HttpClient) {
    super();
  }

  public loadMovies(): void {
    this.setLoading(true);
    this.getMovies().subscribe((data) => this.setEntries(data));
  }

  public loadMoviesByUserId(id: number): void {
    this.getMoviesByUserId(id).subscribe((item) => {
      if (item) {
        this.setEntry(item);
      }
    });
  }

  public setFilters(filters: MovieFilters): void {
    const newState = { ...this.filters.getValue(), ...filters };
    this.filters.next(newState);
  }

  private getMovies(): Observable<IMovie[]> {
    return this.httpClient.get<IMovie[]>("http://api.tvmaze.com/shows");
  }

  private getMoviesByUserId(id: number): Observable<IMovie | null> {
    // TODO: continue there
    return of(null);
  }
}
