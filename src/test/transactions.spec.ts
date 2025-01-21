import {
  test,
  beforeAll,
  afterAll,
  describe,
  it,
  expect,
  beforeEach,
} from "vitest";
import request from "supertest";
import { execSync } from "node:child_process";
import { app } from "../app";

describe("Transaction Routes", () => {
  beforeAll(async () => {
    await app.ready();
  
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync("npm run knex migrate:latest");
  });

  test("User can create a new transaction", async () => {
    //fazer a chamada http p/ criar uma nova transacao
    await request(app.server)
      .post("/transactions")
      .send({
        title: "New Transaction",
        amount: 500,
        type: "credit",
      })
      .expect(201);
  });

  it("should be able to list all transactions", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "New Transaction",
        amount: 5000,
        type: "credit",
      });

    const cookies = createTransactionResponse.get("Set-Cookie");

    const listTransactionResponse = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies || [])
      .expect(200);

    expect(listTransactionResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: "New Transaction",
        amount: 5000,
      }),
    ]);
  });
});
