import retry from "async-retry";
import database from "infra/database.js";

async function waitForAllServices() {
  await waitForWebService();
}

async function waitForWebService() {
  return retry(fetchStatusPage, {
    retries: 100,
    maxTimeout: 1000,
  });

  async function fetchStatusPage() {
    const response = await fetch("http://localhost:3000/api/v1/status");
    if (response.status !== 200) {
      throw new Error(`HTTP error: ${response.status}`);
    }
  }
}

async function clearDatabase() {
  await database.query("DROP schema public CASCADE; create schema public;");
}

const orchestrator = {
  waitForAllServices,
  clearDatabase,
};

export default orchestrator;
