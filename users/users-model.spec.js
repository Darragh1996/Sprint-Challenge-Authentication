const db = require("../database/dbConfig");
const Users = require("../users/users-model");

beforeEach(async () => {
  await db("users").truncate();
});

describe("Users model", () => {
  describe("insert()", () => {
    it("adds users into the db", async () => {
      await Users.add({ username: "Darragh", password: "pass" });
      await Users.add({ username: "Ben", password: "pass" });
      const users = await db("users");

      expect(users).toHaveLength(2);
    });

    // it("does not add a user to the db if username is missing", async () => {
    // await Users.add({ password: "pass" });
    // await Users.add({ username: "Darragh", password: "pass" });
    // const users = await db("users");
    // expect(users).toHaveLength(1);
    //   expect(await Users.add({ password: "pass" })).toThrow(TypeError);
    // });
  });
  describe("find()", () => {
    it("returns all users correctly", async () => {
      await Users.add({ username: "Darragh", password: "pass" });
      await Users.add({ username: "Ben", password: "pass" });
      const users = await Users.find();

      expect(users).toHaveLength(2);
      //   expect(users).toEqual([
      //     { id: 1, username: "Darragh" },
      //     { id: 2, username: "Ben" }
      //   ]);
    });
  });
  describe("findBy()", () => {
    it("returns only the users that match .where({filter})", async () => {
      await Users.add({ username: "Darragh", password: "pass" });
      await Users.add({ username: "Ben", password: "pass" });
      const users = await Users.findBy({ username: "Darragh" });
      expect(users).toEqual({ id: 1, password: "pass", username: "Darragh" });
    });
  });
  describe("findById()", () => {
    it("returns only the user at {id}", async () => {
      await Users.add({ username: "Darragh", password: "pass" });
      await Users.add({ username: "Ben", password: "pass" });
      const user = await Users.findById(1);
      expect(user).toEqual({ id: 1, password: "pass", username: "Darragh" });
    });
  });
  describe("remove()", () => {
    it("removes users from the db correctly", async () => {
      await Users.add({ username: "Darragh", password: "pass" });
      await Users.add({ username: "Ben", password: "pass" });
      let users = await Users.find();
      expect(users).toHaveLength(2);
      await Users.remove(2);
      users = await Users.find();
      expect(users).toHaveLength(1);
      expect(users).toEqual([{ id: 1, username: "Darragh" }]);
    });
  });
});
