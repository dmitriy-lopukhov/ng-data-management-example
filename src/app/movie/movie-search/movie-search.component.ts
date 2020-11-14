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
    const { query } = this.movieService.getFilters();
    if (query) {
      this.searchField.patchValue(query);
    }
    this.searchField.valueChanges
      .pipe(
        debounceTime(200),
        filter((searchQuery) => checkQuery(searchQuery)),
        takeUntil(this.destroy$)
      )
      .subscribe((searchQuery) =>
        this.movieService.setFilters({ query: searchQuery })
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
