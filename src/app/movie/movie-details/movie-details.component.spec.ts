import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { MovieService } from "@app/core/services/entities/movie/movie.service";

import { MovieDetailsComponent } from "./movie-details.component";

const fakeActivatedRoute = {
  snapshot: { params: { id: "1" } },
};

describe("MovieDetailsComponent", () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [MovieDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        MovieService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
