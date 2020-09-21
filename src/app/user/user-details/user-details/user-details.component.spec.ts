import {
  async,
  ComponentFixture,
  TestBed,
  waitForAsync,
} from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { UserDetailsComponent } from "./user-details.component";

describe("UserDetailsComponent", () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UserDetailsComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              params: of({ id: 1 }),
            },
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
