import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { IMovie } from "../models/movie.model";

interface IMoviesState {
  movies: IMovie[];
}

const initialState = {
  movies: [],
};

const testData: IMovie[] = [
  {
    id: 1,
    title: "movie 1",
    description: "description 1",
  },
  {
    id: 2,
    title: "movie 2",
    description: "description 2",
  },
  {
    id: 3,
    title: "movie 3",
    description: "description 3",
  },
];

@Injectable({
  providedIn: "root",
})
export class MovieService {
  private state = new BehaviorSubject<IMoviesState>(initialState);
  public readonly state$ = this.state.asObservable();

  constructor() {}

  private setState(state: IMoviesState): void {
    this.state.next({ ...state });
  }

  public loadMovies(): void {
    this.getMovies().subscribe((data) =>
      this.setState({ ...this.state.value, movies: data })
    );
  }

  public loadMoviesByUserId(id: number): void {
    this.getMoviesByUserId(id).subscribe((data) =>
      this.setState({ ...this.state.value, movies: data })
    );
  }

  private getMovies(): Observable<IMovie[]> {
    return of(testData);
  }

  private getMoviesByUserId(id: number): Observable<IMovie[]> {
    return of(testData);
  }
}
