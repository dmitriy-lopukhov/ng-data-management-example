import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { IMovie } from "@app/core/services/entities/movie/movie.model";
import { MovieService } from "@app/core/services/entities/movie/movie.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-movies",
  templateUrl: "./movies.component.html",
  styleUrls: ["./movies.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger("movieCardAnimate", [
      state("in", style({ transform: "translateY(0)", opacity: 1 })),
      transition("void => *", [
        style({ transform: "translateY(10%)", opacity: 0 }),
        animate(500),
      ]),
      transition("* => void", [
        animate(300, style({ transform: "translateY(10%)", opacity: 0 })),
      ]),
    ]),
  ],
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
