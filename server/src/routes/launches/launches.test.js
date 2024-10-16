const request = require("supertest");
const app = require("../../app");
const {mongoConnect,mongoDisconnect}=require('../../services/mongo')

describe("Launches API",()=>{
  beforeAll(async ()=>{
    await mongoConnect();
  })

  afterAll(async ()=>{
    await mongoDisconnect();
  })

  describe("Test GET /launches", () => {
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200);
      // expect(response.statusCode).toBe(200);
    });
  });
  
  describe("Test POST /launches", () => {
    const completeLaunchData = {
      mission: "ZTM155",
      rocket: "ZTM Experimental IS1",
      target: "Kepler-62 f",
      launchDate: "January 17, 2000",
    };
  
    const launchDataWithoutDate = {
      mission: "ZTM155",
      rocket: "ZTM Experimental IS1",
      target: "Kepler-62 f",
    };
  
    const launchWithInvalidDate = {
      mission: "ZTM155",
      rocket: "ZTM Experimental IS1",
      target: "Kepler-62 f",
      launchDate: "Zoot",
    };
  
    test("It should respond with 201 created", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(completeLaunchData)
        .expect("Content-Type", /json/)
        .expect(201);
  
      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
  
      expect(responseDate).toBe(requestDate);
      expect(response.body).toMatchObject(launchDataWithoutDate);
    });
  
    test("It should catch missing required properties", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithoutDate)
        .expect("Content-Type", /json/)
        .expect(400);
  
      expect(response.body).toStrictEqual({
        error: "Missing required launch property",
      });
    });
  
    test("It should catch invalid dates", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchWithInvalidDate)
        .expect("Content-Type", /json/)
        .expect(400);
  
      expect(response.body).toStrictEqual({
        error: "Invalid Launch Date",
      });
    });
  });
})


