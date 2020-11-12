import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "movies",
    loadChildren: () =>
      import("./movie/movie.module").then((m) => m.MovieModule),
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
