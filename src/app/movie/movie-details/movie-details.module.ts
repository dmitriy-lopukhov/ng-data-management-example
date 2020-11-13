import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MovieDetailsRoutingModule } from "./movie-details-routing.module";
import { MovieDetailsComponent } from "./movie-details.component";

@NgModule({
  declarations: [MovieDetailsComponent],
  imports: [CommonModule, MovieDetailsRoutingModule],
})
export class MovieDetailsModule {}
