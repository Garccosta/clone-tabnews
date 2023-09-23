const apiURL = "http://localhost:3000/api";

test("GET to api/v1/status should return 200", async() => {
    const res = await fetch(`${apiURL}/v1/status`)
    expect(res.status).toBe(200);
})