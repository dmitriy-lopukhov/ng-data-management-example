import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MovieCardComponent } from "./movie-card.component";

@NgModule({
  declarations: [MovieCardComponent],
  imports: [CommonModule],
  exports: [MovieCardComponent],
})
export class MovieCardModule {}
