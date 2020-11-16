const Classes = require("../data/models/class-model");
const db = require("../data/config.js");
const server = require("../api/server");
const { italic } = require("colors");
const { default: expectCt } = require("helmet/dist/middlewares/expect-ct");
const { request } = require("supertest");

beforeEach(async () => {
  await db("classes").truncate();
});

// describe("get classes", () => {
//   it("gets all classes", () => {
//     return request(router)
//     .get('/')
//     .expect("")
//   }

//   );
// });

describe("get classes", () => {
  it("gets all classes", async () => {
    let classes = await request(server).get("/classes");
    expect(classes).toHaveLength(4);
  });
});
