import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MovieService } from "@app/core/services/entities/movie/movie.service";
import { MovieSearchComponent } from "../movie-search/movie-search.component";

import { MoviesComponent } from "./movies.component";

describe("MoviesComponent", () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, ReactiveFormsModule],
        declarations: [MoviesComponent, MovieSearchComponent],
        providers: [MovieService],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
