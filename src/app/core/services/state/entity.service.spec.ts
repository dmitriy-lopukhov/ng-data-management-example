import { Injectable } from "@angular/core";
import { TestBed } from "@angular/core/testing";

import { EntityService } from "./entity.service";

@Injectable({
  providedIn: "root",
})
class CustomEntityService extends EntityService<{}> {
  constructor() {
    super();
  }
}

describe("EntityService", () => {
  let service: CustomEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomEntityService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
