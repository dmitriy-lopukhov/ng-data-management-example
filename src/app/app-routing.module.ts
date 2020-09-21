import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "users",
    loadChildren: "./user/user.module#UserModule",
  },
  {
    path: "movies",
    loadChildren: "./movie/movie.module#MovieModule",
  },
  {
    path: "**",
    redirectTo: "users",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
