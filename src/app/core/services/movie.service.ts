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
  public state = new BehaviorSubject<IMoviesState>(initialState);

  constructor() {}

  private setState(state: IMoviesState) {
    this.state.next({ ...state });
  }

  loadMovies() {
    this.getMovies().subscribe((data) =>
      this.setState({ ...this.state.value, movies: data })
    );
  }

  loadMoviesByUserId(id: number) {
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
