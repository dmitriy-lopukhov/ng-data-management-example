import { TestBed } from "@angular/core/testing";

import { EntityService } from "./entity.service";

describe("EntityService", () => {
  let service: EntityService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
