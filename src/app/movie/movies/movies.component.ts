import { ChangeDetectionStrategy, Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { MovieService } from "@app/core/services/entities/movie/movie.service";
import { IMovie } from "shared-core";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-movies",
  templateUrl: "./movies.component.html",
  styleUrls: ["./movies.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesComponent implements OnDestroy {
  movies$: Observable<IMovie[]>;
  total$: Observable<number>;
  isEnd = false;
  destroy$ = new Subject();

  constructor(private movieService: MovieService, private router: Router) {
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

  onClicked(movie: IMovie): void {
    this.router.navigate(["movies", movie.id]);
  }
}
