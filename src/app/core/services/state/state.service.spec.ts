import { Injectable } from "@angular/core";
import { TestBed } from "@angular/core/testing";

import { StateService } from "./state.service";

@Injectable({
  providedIn: "root",
})
class CustomStateService extends StateService<{}> {
  constructor() {
    super();
  }
}

describe("StateService", () => {
  let customStateService: CustomStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    customStateService = TestBed.inject(CustomStateService);
  });

  it("should be created", () => {
    expect(customStateService).toBeTruthy();
  });
});
