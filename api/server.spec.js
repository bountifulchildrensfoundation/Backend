const request = require("supertest");
const server = require("./server.js");
const db = require("../database/dbConfig.js");

describe("SERVER", () => {
  // resets database when re-running ALL tests
  beforeAll(async () => {
    await db("users").truncate();
  });

  // for following endpoint tests to use for token --> .send(newRegister)
  // then need .set("authorization", user.body.token) to set token to authorization header for restricted routes
  const newRegister = {
    firstname: "Wendy",
    lastname: "Williams",
    country: "Bolivia",
    title: "Coordinator",
    email: "wendy@company.com",
    username: "wendywilliams",
    password: "wendywilliams"
  };

  const newStory = {
    user_id: 1,
    title: "The Grand Zimbabwe",
    country: "Zimbabwe",
    description: "A cool story that happened in Zimbabwe",
    fullStory:
      "Zimbabwe is a landlocked country in southern Africa known for its dramatic landscape and diverse wildlife, much of it within parks, reserves and safari areas. On the Zambezi River, Victoria Falls make a thundering 108m drop into narrow Batoka Gorge, where there’s white-water rafting and bungee-jumping. Downstream are Matusadona and Mana Pools national parks, home to hippos, rhinos and birdlife.",
    date: "May 18, 2019"
  };

  // not used because db reset before tests and this user would never have registered before
  const loggedInUser = {
    username: "wendywilliams",
    password: "webdywilliams"
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

      it("should provide a token", async () => {
        const response = await request(server)
          .post("/users/register")
          .send(newRegister);
        expect(response.body.token).toBeDefined();
      });
    });

    describe("POST /users/login", () => {
      // if using beforeEach then need to add api call to register before each login test
      it("should return 200 OK", async () => {
        const response = await request(server)
          .post("/users/login")
          .send(newRegister);
        expect(response.status).toBe(200);
      });

      it("should return json object", async () => {
        const response = await request(server)
          .post("/users/login")
          .send(loggedInUser);
        expect(response.type).toBe("application/json");
      });

      it("should return object containing welcome message", async () => {
        const expectedBody = `Welcome ${newRegister.username}!`;
        const response = await request(server)
          .post("/users/login")
          .send(newRegister);
        // console.log(response);
        expect(response.body.message).toBe(expectedBody);
      });
    });
  });

  describe("STORIES", () => {
    describe("GET /stories", () => {
      it("should return 200 OK", async () => {
        // first register to get token/access
        const user = await request(server)
          .post("/users/register")
          .send(newRegister);
        const response = await request(server)
          .get("/stories")
          .set("authorization", user.body.token);
        expect(response.status).toBe(200);
      });

      it("should return JSON object", async () => {
        // first register to get token/access then set token on authorization header
        const user = await request(server)
          .post("/users/register")
          .send(newRegister);
        const response = await request(server)
          .get("/stories")
          .set("authorization", user.body.token);
        expect(response.type).toBe("application/json");
      });

      it("should return stories with given properties", async () => {
        // first register to get token/access then set token on authorization header
        const user = await request(server)
          .post("/users/register")
          .send(newRegister);
        const response = await request(server)
          .get("/stories")
          .set("authorization", user.body.token);

        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0]).toHaveProperty("user_id");
        expect(response.body[0]).toHaveProperty("title");
        expect(response.body[0]).toHaveProperty("description");
        expect(response.body[0]).toHaveProperty("fullStory");
        expect(response.body[0]).toHaveProperty("date");
        /*     
        expect(response.body).toEqual(          // 1) expect array equals
          expect.arrayContaining([      // 2) an array that contains
            expect.objectContaining({   // 3) an object that contains
              fullStory: ""               // 4) a property
            })
          ])
        );
        */
      });
    });

    describe("POST /stories", () => {
      it("should return 200 OK", async () => {
        // first register to get token/access then set token on authorization header
        const user = await request(server)
          .post("/users/register")
          .send(newRegister);
        const response = await request(server)
          .post("/stories")
          .set("authorization", user.body.token)
          .send(newStory);
        expect(response.status).toBe(200);
      });

      it("should return JSON object", async () => {
        // first register to get token/access then set token on authorization header
        const user = await request(server)
          .post("/users/register")
          .send(newRegister);
        const response = await request(server)
          .post("/stories")
          .set("authorization", user.body.token)
          .send(newStory);
        expect(response.type).toBe("application/json");
      });

      it("should return story with id", async () => {
        // first register to get token/access then set token on authorization header
        const user = await request(server)
          .post("/users/register")
          .send(newRegister);
        const response = await request(server)
          .post("/stories")
          .set("authorization", user.body.token)
          .send(newStory);
        expect(response.body).toHaveProperty("id");
      });
    });
  });
});
