import { createPost } from "./create.js";

const mockObject = {
  title: "title",
  body: "body",
  tags: ["1", "2"],
  media: "",
  created: "2023-01-16T12:00:00.000Z",
  updated: "2023-01-16T12:00:00.000Z",
  id: 1000,
  _count: {
    comments: 0,
    reactions: 0,
  },
};

const mockFetchSuccess = jest.fn().mockResolvedValue({
  ok: true,
  json: jest.fn().mockResolvedValue(mockObject),
});

global.fetch = mockFetchSuccess;

describe("create", () => {
  it("returns a valid item with a valid input", async () => {
    const post = await createPost("title", "body", "", ["1", "2"]);
    expect(post).toMatchObject(mockObject);
  });
});
