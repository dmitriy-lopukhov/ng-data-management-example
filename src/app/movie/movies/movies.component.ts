import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { ChangeDetectionStrategy, Component, OnDestroy } from "@angular/core";
import { IMovie } from "@app/core/services/entities/movie/movie.model";
import { MovieService } from "@app/core/services/entities/movie/movie.service";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

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
export class MoviesComponent implements OnDestroy {
  movies$: Observable<IMovie[]>;
  total$: Observable<number>;
  end$: Observable<boolean>;
  destroy$ = new Subject();

  constructor(private movieService: MovieService) {
    this.movies$ = this.movieService.moviesByPage$;
    this.total$ = this.movieService.total$;
    this.end$ = this.movieService.end$;
    this.movieService.loaded$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loaded) => {
        if (!loaded) {
          this.movieService.loadMovies();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  loadMore(): void {
    this.movieService.loadMore();
  }
}
