import { login } from "./login.js";

const mockFetchSuccess = jest.fn().mockResolvedValue({
  ok: true,
  json: jest.fn().mockResolvedValue({
    name: "workflowca",
    email: "workflowca@stud.noroff.no",
    banner: null,
    avatar: null,
    accessToken: "workflowca's token",
  }),
});

global.fetch = mockFetchSuccess;

class LocalStorageMock {
  constructor() {
    this.storage = {};
  }

  clear() {
    this.storage = {};
  }

  setItem(key, value) {
    this.storage[key] = String(value);
  }

  getItem(key) {
    return this.storage[key] || null;
  }
}

global.localStorage = new LocalStorageMock();

describe("login", () => {
  it("stores a token when provided with valid credentials", async () => {
    localStorage.clear();
    await login("workflowca@stud.noroff.no", "");
    const token = localStorage.getItem("token");
    expect(token).not.toBeNull();
  });
});
