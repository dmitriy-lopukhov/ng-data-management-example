import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { MovieRoutingModule } from "./movie-routing.module";
import { MoviesComponent } from "./movies/movies.component";
import { MovieSearchComponent } from "./movie-search/movie-search.component";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { MovieCardModule } from "projects/movie-card/src/public-api";

@NgModule({
  declarations: [MoviesComponent, MovieSearchComponent],
  imports: [
    CommonModule,
    MovieRoutingModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    MovieCardModule,
  ],
})
export class MovieModule {}
