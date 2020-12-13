import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { IMovie, getGenres } from "shared-core";

@Component({
  selector: "app-movie-card",
  templateUrl: "./movie-card.component.html",
  styleUrls: ["./movie-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardComponent implements OnInit {
  @Input() movie: IMovie | null = null;
  @Output() clicked = new EventEmitter<IMovie>();
  constructor() {}

  getGenres = getGenres;

  ngOnInit(): void {}

  getImageUrl(movie: IMovie): string {
    return movie?.image?.medium ? `url(${movie.image.medium})` : "";
  }

  onClick(movie: IMovie): void {
    this.clicked.emit(movie);
  }
}
