import { Component, ChangeDetectionStrategy, OnDestroy } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MovieService } from "@app/core/services/entities/movie/movie.service";
import { Subject } from "rxjs";
import { debounceTime, filter, takeUntil } from "rxjs/operators";

function checkQuery(query: string): boolean {
  return !query || !!(query && query.length > 2);
}

@Component({
  selector: "app-movie-search",
  templateUrl: "./movie-search.component.html",
  styleUrls: ["./movie-search.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieSearchComponent implements OnDestroy {
  destroy$ = new Subject();
  searchField = new FormControl("");

  constructor(private movieService: MovieService) {
    this.searchField.valueChanges
      .pipe(
        debounceTime(200),
        filter((query) => checkQuery(query)),
        takeUntil(this.destroy$)
      )
      .subscribe((query) => this.movieService.setFilters({ query }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
