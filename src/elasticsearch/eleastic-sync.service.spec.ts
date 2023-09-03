import { Test, TestingModule } from "@nestjs/testing";
import { EleasticSyncService } from "./eleastic-sync.service";

describe("EleasticSyncService", () => {
  let service: EleasticSyncService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EleasticSyncService],
    }).compile();

    service = module.get<EleasticSyncService>(EleasticSyncService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
