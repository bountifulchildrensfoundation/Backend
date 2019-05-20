const request = require("supertest");
const server = require("./server.js");
const db = require("../database/dbConfig.js");

describe("SERVER", () => {
  // resets database when re-running ALL tests
  beforeAll(async () => {
    await db("users").truncate();
  });

  // for following endpoint tests to use for token
  // .send(newRegister)
  const newRegister = {
    firstname: "Jane",
    lastname: "Doe",
    country: "Peru",
    title: "Coordinator",
    email: "jane@company.com",
    username: "janedoe",
    password: "janedoe"
  };

  const newLogin = {
      username: "janedoe",
      password: "janedoe"
  };

  it("should set the environment to testing", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("GET /", () => {
    it("should return 200 OK", async () => {
      const response = await request(server).get("/");
      expect(response.status).toBe(200);
    });

    it("should return text/html", async () => {
      const response = await request(server).get("/");
      expect(response.type).toBe("text/html");
    });
  });

  describe("USERS", () => {
    describe("POST /users/register", () => {
      it("should return 201 OK", async () => {
        const response = await request(server)
          .post("/users/register")
          .send(newRegister);
        expect(response.status).toBe(201);
      });

      it("should return json object", async () => {
        const response = await request(server)
          .post("/users/register")
          .send(newRegister);
        expect(response.type).toBe("application/json");
      });

      it("should return object containing firstname field", async () => {
        const expectedBody = { firstname: newRegister.firstname };
        const response = await request(server)
          .post("/users/register")
          .send(newRegister);
        expect(response.body.user).toEqual(
          expect.objectContaining(expectedBody)
        );
      });
    });

    describe("POST /users/login", () => {
      it("should return 200 OK", async () => {
        const response = await request(server)
          .post("/users/login")
          .send(newLogin);
        expect(response.status).toBe(200);
      });

      it("should return json object", async () => {
        const response = await request(server)
          .post("/users/login")
          .send(newLogin);
        expect(response.type).toBe("application/json");
      });

      it("should return object containing welcome message", async () => {
        const expectedBody = `Welcome ${newLogin.username}!`;
        const response = await request(server)
          .post("/users/login")
          .send(newLogin);
        // console.log(response);
        expect(response.body.message).toBe(expectedBody);
      });
    });
  });

  describe("STORIES", () => {
    describe("GET /stories", () => {
      it("should return 200 OK", async () => {
        // first register to get token/access
        await request(server)
          .post("/users/register")
          .send(newRegister);

        const response = await request(server).get("/");
        expect(response.status).toBe(200);
      });

      it("should return JSON object", async () => {
        // first register to get token/access
        await request(server)
          .post("/users/register")
          .send(newRegister);

        const response = await request(server).get("/stories");
        expect(response.type).toBe("application/json");
      });
    });
  });
});
