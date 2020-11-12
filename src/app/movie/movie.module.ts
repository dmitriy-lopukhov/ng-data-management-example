import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { MovieRoutingModule } from "./movie-routing.module";
import { MoviesComponent } from "./movies/movies.component";
import { MovieCardComponent } from "./movie-card/movie-card.component";
import { MovieSearchComponent } from "./movie-search/movie-search.component";

@NgModule({
  declarations: [MoviesComponent, MovieCardComponent, MovieSearchComponent],
  imports: [CommonModule, MovieRoutingModule, ReactiveFormsModule],
})
export class MovieModule {}
