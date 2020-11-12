import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MoviesComponent } from "./movies/movies.component";

const routes: Routes = [
  {
    path: "",
    component: MoviesComponent,
    // TODO: movie details
    // children: [
    //   {
    //     path: "details/:id",
    //     loadChildren: () =>
    //       import("./movie-details/movie-details.module").then(
    //         (m) => m.MovieDetailsModule
    //       ),
    //   },
    // ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieRoutingModule {}
