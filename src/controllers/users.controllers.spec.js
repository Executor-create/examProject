const { addUser } = require("./users.controllers");
const { getBookForUser } = require('./users.controllers');

const UserMock = {};

jest.mock("../models/User", () => {
  UserMock.save = jest.fn();
  UserMock.findById = jest.fn();

  return {
    User: jest.fn().mockImplementation(() => ({
      save: UserMock.save,
      findById: UserMock.findById,
    }))
  }
});

const bookMock = {};

jest.mock("../models/Book", () => {
  bookMock.findById = jest.fn();

  return {
    Book: jest.fn().mockImplementation(() => ({
      findById: bookMock.findById,
    }))
  }
});

describe("User", () => {
  describe("addUser", () => {
    it("should be status code 200 when user insert in db was success", async () => {
      const req = {
        body: {
          name: "user-name",
          login: "user-login",
          password: "user-password",
        },
      };
      const res = {
        status: jest.fn().mockImplementation(() => res),
        send: jest.fn(),
      };

      UserMock.save.mockImplementationOnce(async () => { return {} });

      await addUser(req, res);

      expect(res.status).toBeCalledTimes(1);
      expect(res.status).toBeCalledWith(200);
    });
  });

  describe("getBookForUser", () => {
    it("should return status 404 if user is not found", async () => {
      const req = { params: { _id: "user-id" }, body: { book_id: "book-id" } };
      const res = {
        status: jest.fn().mockImplementation(() => res),
        send: jest.fn(),
      };

      UserMock.findById.mockImplementationOnce(null);

      await getBookForUser(req, res);

      expect(res.status).toBeCalledTimes(1);
      expect(res.status).toBeCalledWith(404);
    })

    it("should return status 404 if book is not available", async () => {
      const req = { params: { _id: "user-id" }, body: { book_id: "book-id" } };
      const res = {
        status: jest.fn().mockImplementation(() => res),
        send: jest.fn(),
      };

      const book = { _id: "book-id", quantity: { available: 0 } };

      bookMock.findById.mockImplementationOnce(book)

      await getBookForUser(req, res);

      expect(res.status).toBeCalledTimes(1);
      expect(res.status).toBeCalledWith(404);
    })

    it('should return error if user has reached the book limit', async () => {
      const req = { params: { _id: 'user-id' }, body: { book_id: 'book-id' } };
      const res = {
        status: jest.fn().mockImplementation(() => res),
        send: jest.fn(),
      };

      const user = { _id: 'user-id', bookLimit: 2, books: [{ book_id: 'book-id', dateOfReturn: null }] };
      const book = { _id: 'book-id', quantity: { available: 0 } };


      await getBookForUser(req, res);

      expect(user.books).toHaveLength(1);
      expect(book.quantity.available).toBe(0);
      expect(res.status).toBeCalledTimes(1);
      expect(res.status).toBeCalledWith(404);
    });

    it('should successfully get the book for the user', async () => {
     
    });
  })
});