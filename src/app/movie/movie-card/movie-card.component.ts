import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { IMovie } from "@app/core/services/entities/movie/movie.model";

@Component({
  selector: "app-movie-card",
  templateUrl: "./movie-card.component.html",
  styleUrls: ["./movie-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardComponent implements OnInit {
  @Input() movie: IMovie | null = null;
  constructor() {}

  ngOnInit(): void {}

  getImageUrl(movie: IMovie): string {
    return movie?.image?.medium ? `url(${movie.image.medium})` : "";
  }

  getGenres(genres: string[]): string {
    return (genres && genres.join(", ")) || "-";
  }
}
