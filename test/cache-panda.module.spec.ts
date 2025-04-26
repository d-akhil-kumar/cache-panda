import { Test } from "@nestjs/testing";
import { CachePanda } from "../src/cache-panda.module";
import { CachePandaService } from "../src/services/cache-panda.service";

describe("CachePanda Module", () => {
  it("should register CachePanda with register()", async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CachePanda.register({ ttl: 5 })],
    }).compile();

    const service = moduleRef.get(CachePandaService);
    expect(service).toBeDefined();
  });

  it("should register CachePanda with registerAsync()", async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        CachePanda.registerAsync({
          useFactory: async () => ({ ttl: 5 }),
        }),
      ],
    }).compile();

    const service = moduleRef.get(CachePandaService);
    expect(service).toBeDefined();
  });
});
