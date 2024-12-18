import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("POST api/v1/migrations", () => {
  describe("Anonymous user", () => {
    const apiURL = "http://localhost:3000/api";
    describe("Running pending migrations", () => {
      test("For the first time", async () => {
        const res = await fetch(`${apiURL}/v1/migrations`, { method: "POST" });
        expect(res.status).toBe(201);

        const responseBody = await res.json();
        expect(Array.isArray(responseBody)).toEqual(true);
        expect(responseBody.length).toBeGreaterThan(0);
      });

      test("For the second time", async () => {
        const res2 = await fetch(`${apiURL}/v1/migrations`, { method: "POST" });
        expect(res2.status).toBe(200);

        const responseBody2 = await res2.json();
        expect(Array.isArray(responseBody2)).toEqual(true);
        expect(responseBody2.length).toBe(0);
      });

      test("Using not allowed methods", async () => {
        const otherRESTMethods = ["PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"];

        for (const method of otherRESTMethods) {
          const res = await fetch(`${apiURL}/v1/migrations`, { method });
          expect(res.status).toBe(405);

          const statusResponse = await fetch(`${apiURL}/v1/status`);
          const resBody = await statusResponse.json();
          expect(resBody.dependencies.database.opened_connections).toEqual(1);
        }
      });
    });
  });
});
