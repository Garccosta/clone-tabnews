import orchestrator from "tests/orchestrator.js";

beforeAll(async () => await orchestrator.waitForAllServices());

const apiURL = "http://localhost:3000/api";

describe("GET api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const res = await fetch(`${apiURL}/v1/status`);
      expect(res.status).toBe(200);
      const resBody = await res.json();

      expect(resBody.updated_at).toBeDefined();
      expect(resBody.dependencies.database.version).toBeDefined();
      expect(resBody.dependencies.database.max_connections).toBeDefined();
      expect(resBody.dependencies.database.opened_connections).toBeDefined();

      expect(resBody.dependencies.database.version).toEqual("16.0");
      expect(resBody.dependencies.database.max_connections).toEqual(100);
      expect(resBody.dependencies.database.opened_connections).toEqual(1);
    });
  });
});
