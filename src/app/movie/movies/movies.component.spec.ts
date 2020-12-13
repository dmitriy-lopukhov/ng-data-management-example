import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { IMovie } from "projects/shared-core/src/public-api";
import { MovieService } from "@app/core/services/entities/movie/movie.service";
import { of } from "rxjs";
import { MovieCardComponent } from "projects/movie-card/src/public-api";
import { MovieSearchComponent } from "../movie-search/movie-search.component";

import { MoviesComponent } from "./movies.component";

const testMovies: IMovie[] = [
  {
    id: 1,
    url: "http://www.tvmaze.com/shows/1/under-the-dome",
    name: "Under the Dome",
    language: "English",
    genres: ["Drama", "Science-Fiction", "Thriller"],
    status: "Ended",
    runtime: 60,
    premiered: "2013-06-24",
    officialSite: "http://www.cbs.com/shows/under-the-dome/",
    schedule: {
      time: "22:00",
      days: ["Thursday"],
    },
    rating: {
      average: 6.5,
    },
    weight: 97,
    image: {
      medium:
        "http://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg",
      original:
        "http://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg",
    },
    summary:
      "<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The town's inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.</p>",
    updated: 1573667713,
  },
];

describe("MoviesComponent", () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          ReactiveFormsModule,
          BrowserAnimationsModule,
          RouterTestingModule,
        ],
        declarations: [
          MoviesComponent,
          MovieCardComponent,
          MovieSearchComponent,
        ],
        providers: [MovieService],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    component.movies$ = of(testMovies);
    component.isEnd = false;
    component.total$ = of(testMovies.length);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should contain search input", () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("app-movie-search")).toBeTruthy();
  });

  it("should contain total count", () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("p.total")).toBeTruthy();
  });

  it("should contain movie card", () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("app-movie-card")).toBeTruthy();
  });
});
