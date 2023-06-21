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

const BookMock = {};

jest.mock("../models/Book", () => {
  BookMock.updateMany = jest.fn();

  return {
    Book: jest.fn().mockImplementation(() => ({
      updateMany: CategoryMock.updateMany,
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
    it("should update the category and related books and return the updated category with status code 200 when it exists", async () => {
      const req = { params: { _id: "123" }, body: { name: "category-name" } };
      const res = {
        status: jest.fn().mockImplementation(() => res),
        send: jest.fn(),
      };

      CategoryMock.findById.mockImplementationOnce({ _id: "123" });
      CategoryMock.findByIdAndUpdate.mockImplementationOnce({ _id: "123", name: "name" });
      BookMock.updateMany.mockImplementationOnce({ nModified: 3 });

      await updateCategory(req, res);

      expect(res.status).toBeCalledTimes(2);
      expect(res.status).toBeCalledWith(200);
    });
    it("should return a 404 error when the category is not found", async () => {
      const req = { params: { _id: "123" }, body: {} };
      const res = {
        status: jest.fn().mockImplementation(() => res),
        send: jest.fn(),
      };

      CategoryMock.findById.mockImplementationOnce(async () => { throw new Error() });

      await updateCategory(req, res);

      expect(res.status).toBeCalledTimes(2);
      expect(res.status).toBeCalledWith(404);
    });
  });
});
