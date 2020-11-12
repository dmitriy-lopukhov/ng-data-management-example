import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { IMovie } from "@app/core/services/entities/movie/movie.model";
import { MovieService } from "@app/core/services/entities/movie/movie.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-movies",
  templateUrl: "./movies.component.html",
  styleUrls: ["./movies.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesComponent implements OnInit {
  movies$: Observable<IMovie[]>;
  total$: Observable<number>;

  constructor(private movieService: MovieService) {
    this.movieService.loadMovies();
    this.movies$ = this.movieService.moviesByPage$;
    this.total$ = this.movieService.total$;
  }

  ngOnInit(): void {}
}
