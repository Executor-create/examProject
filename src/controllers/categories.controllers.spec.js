const { addCategory } = require("./categories.controllers");
const { updateCategory } = require('./categories.controllers');

const CategoryMock = {};

jest.mock("../models/Category", () => {
  CategoryMock.save = jest.fn();
  CategoryMock.findById = jest.fn();
  CategoryMock.findByIdAndUpdate = jest.fn();

  return {
    Category: jest.fn().mockImplementation(() => ({
      save: CategoryMock.save,
      findById: CategoryMock.findById,
      findByIdAndUpdate: CategoryMock.findByIdAndUpdate,
    })),
  };
});

describe("Category", () => {
  describe("addCategory", () => {
    it("should be status code 400 when insert in db was failed", async () => {
      const req = { body: { name: "name-1" } };
      const res = {
        status: jest.fn().mockImplementation(() => res),
        send: jest.fn(),
      };

      CategoryMock.save.mockImplementationOnce(async () => { throw new Error() })

      await addCategory(req, res);

      expect(res.status).toBeCalledTimes(1);
      expect(res.status).toBeCalledWith(400);
    });

    it("should be status code 201 when insert in db was success", async () => {
      const req = { body: { name: "name-1" } };
      const res = {
        status: jest.fn().mockImplementation(() => res),
        send: jest.fn(),
      };

      CategoryMock.save.mockImplementationOnce(async () => { return {} })

      await addCategory(req, res);

      expect(res.status).toBeCalledTimes(1);
      expect(res.status).toBeCalledWith(201);
    });
  });

  describe("updateCategory", () => {
    it("should be status code 404 when category not found", async () => {
      const req = { params: { _id: "category-id" }, body: { name: "updated-name" } }
      const res = {
        status: jest.fn().mockImplementation(() => res),
        send: jest.fn(),
      };

      CategoryMock.findById.mockImplementationOnce(async () => { throw new Error() });

      await updateCategory(req, res);

      expect(res.status).toBeCalledTimes(1);
      expect(res.status).toBeCalledWith(404);

    });

    it("should return status code 200 and update category", async () => {
      
    });
  });
});
