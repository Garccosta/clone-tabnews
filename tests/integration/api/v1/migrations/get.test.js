import orchestrator from "tests/orchestrator.js";

const apiURL = "http://localhost:3000/api";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("GET api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Retrieving pending migrations", async () => {
      const res = await fetch(`${apiURL}/v1/migrations`);
      expect(res.status).toBe(200);

      const responseBody = await res.json();
      expect(Array.isArray(responseBody)).toEqual(true);
      expect(responseBody.length).toBeGreaterThan(0);
    });
  });
});
