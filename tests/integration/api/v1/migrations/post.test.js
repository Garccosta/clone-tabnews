import database from "infra/database.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

beforeEach(async () => {
  await database.query("DROP schema public CASCADE; create schema public;");
});

const apiURL = "http://localhost:3000/api";

test("POST to api/v1/migrations should return 200", async () => {
  const res = await fetch(`${apiURL}/v1/migrations`, { method: "POST" });
  expect(res.status).toBe(201);

  const responseBody = await res.json();
  expect(Array.isArray(responseBody)).toEqual(true);
  expect(responseBody.length).toBeGreaterThan(0);

  const res2 = await fetch(`${apiURL}/v1/migrations`, { method: "POST" });
  expect(res2.status).toBe(200);

  const responseBody2 = await res2.json();
  expect(Array.isArray(responseBody2)).toEqual(true);
  expect(responseBody2.length).toBe(0);
});

test("Other method to api/v1/migrations should return 405", async () => {
  const otherRESTMethods = ["PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"];

  for (const method of otherRESTMethods) {
    const res = await fetch(`${apiURL}/v1/migrations`, { method });
    expect(res.status).toBe(405);

    const statusResponse = await fetch(`${apiURL}/v1/status`);
    const resBody = await statusResponse.json();
    expect(resBody.dependencies.database.opened_connections).toEqual(1);
  }
});
