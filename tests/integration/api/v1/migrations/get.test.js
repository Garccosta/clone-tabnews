import database from "infra/database.js";
import orchestrator from "tests/orchestrator.js";

const apiURL = "http://localhost:3000/api";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("DROP schema public CASCADE; create schema public;");
});

test("GET to api/v1/migrations should return 200", async () => {
  const res = await fetch(`${apiURL}/v1/migrations`);
  expect(res.status).toBe(200);

  const responseBody = await res.json();
  expect(Array.isArray(responseBody)).toEqual(true);
  expect(responseBody.length).toBeGreaterThan(0);
});
