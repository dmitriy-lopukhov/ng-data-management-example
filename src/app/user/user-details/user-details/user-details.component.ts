import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { IUser } from "src/app/core/models/user.model";
import { UserService } from "src/app/core/services/user.service";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { MovieService } from "src/app/core/services/movie.service";
import { IMovie } from "src/app/core/models/movie.model";

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.scss"],
})
export class UserDetailsComponent implements OnInit {
  user$: Observable<IUser>;
  movies$: Observable<IMovie[]>;

  constructor(
    private userService: UserService,
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute
  ) {
    // in a real app there should be unsubscription everywhere
    this.activatedRoute.params.subscribe((params) => {
      const userId = +params["id"];
      this.userService.loadUserById(userId);
      this.movieService.loadMoviesByUserId(userId);
    });

    this.user$ = this.userService.state.pipe(map((state) => state.currentUser));
    this.movies$ = this.movieService.state.pipe(map((state) => state.movies));
  }

  ngOnInit() {}
}
