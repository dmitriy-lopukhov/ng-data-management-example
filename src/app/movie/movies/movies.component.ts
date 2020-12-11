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
        animate(300),
      ]),
      transition("* => void", [
        animate(200, style({ transform: "translateY(10%)", opacity: 0 })),
      ]),
    ]),
  ],
})
export class MoviesComponent implements OnDestroy {
  movies$: Observable<IMovie[]>;
  total$: Observable<number>;
  isEnd = false;
  destroy$ = new Subject();

  constructor(private movieService: MovieService) {
    this.movies$ = this.movieService.moviesByPage$;
    this.total$ = this.movieService.total$;
    this.movieService.end$.pipe(takeUntil(this.destroy$)).subscribe((isEnd) => {
      this.isEnd = isEnd;
    });
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

  onScroll(): void {
    if (this.isEnd) {
      return;
    }
    this.movieService.loadMore();
  }
}
