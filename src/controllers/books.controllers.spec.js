const { addBook } = require('./books.controllers');
const { getBook } = require('./books.controllers');

const bookMock = {};

jest.mock("../models/Book", () => {
  bookMock.save = jest.fn();
  bookMock.findById = jest.fn();

  return {
    Book: jest.fn().mockImplementation(() => ({
      save: bookMock.save,
      findById: bookMock.findById,
    }))
  }
});

describe("Book", () => {
  describe("addBook", () => {
    it("should return status code 400 when short description is too long", async () => {
      const req = {
        body: {
          title: "book-title",
          category: "book-category",
          description: {
            short: "book-short".repeat(257),
            full: "book-full"
          },
          countOfPages: 100,
          quantity: 5,
        }
      }
      const res = {
        status: jest.fn().mockImplementation(() => res),
        send: jest.fn(),
        json: jest.fn(),
      }

      bookMock.save.mockImplementationOnce(async () => { throw new Error() });

      await addBook(req, res);

      expect(res.status).toBeCalledTimes(3);
      expect(res.status).toBeCalledWith(400);
      expect(res.send).toBeCalledTimes(3);
      expect(res.send).toBeCalledWith({ error: "Short description is too long" });
    })
    it("should return status code 400 when short description is too long", async () => {
      const req = {
        body: {
          title: "book-title",
          category: "book-category",
          description: {
            short: "book-short".repeat(257),
            full: "book-full"
          },
          countOfPages: -100,
          quantity: -5,
        }
      }
      const res = {
        status: jest.fn().mockImplementation(() => res),
        send: jest.fn(),
      }

      bookMock.save.mockImplementationOnce(async () => { throw new Error() });

      await addBook(req, res);

      expect(res.status).toBeCalledTimes(4);
      expect(res.status).toBeCalledWith(400);
      expect(res.send).toBeCalledTimes(4);
      expect(res.send).toBeCalledWith({ error: "Cannot have negative values for count of pages or quantity" });
    })
    it("should be status code 201 when insert in db was success", async () => {
      const req = {
        body: {
          title: "book-title",
          category: "book-category",
          description: {
            short: "book-short",
            full: "book-full"
          },
          countOfPages: "book-count",
          quantity: "book-quantity",
        }
      }
      const res = {
        status: jest.fn().mockImplementation(() => res),
        send: jest.fn(),
      }

      bookMock.save.mockImplementationOnce(async () => { return {} });

      await addBook(req, res);

      expect(res.status).toBeCalledTimes(1);
      expect(res.status).toBeCalledWith(201);
    })
  });
  describe("getBook", () => {
    it("should be status code 200 and get book", async () => {
      const req = { params: { _id: "book-id" } }
      const res = {
        status: jest.fn().mockImplementation(() => res),
        send: jest.fn(),
      }

      bookMock.findById.mockImplementationOnce(async () => { return {} });

      await getBook(req, res);

      expect(res.status).toBeCalledTimes(2);
      expect(res.status).toBeCalledWith(200);
    })
  })
})