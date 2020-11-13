import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "movies",
    loadChildren: () =>
      import("./movie/movie.module").then((m) => m.MovieModule),
  },
  {
    path: "movies/:id",
    loadChildren: () =>
      import("./movie/movie-details/movie-details.module").then(
        (m) => m.MovieDetailsModule
      ),
  },
  {
    path: "**",
    redirectTo: "movies",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
