import { logout } from "./logout.js";

class LocalStorageMock {
  constructor() {
    this.storage = {
      token: "token",
      profile: `{"name":"workflowca","email":"workflowca@stud.noroff.no","banner":null,"avatar":null}`,
    };
  }

  getItem(key) {
    return this.storage[key] || null;
  }

  removeItem(key) {
    delete this.storage[key];
  }
}

global.localStorage = new LocalStorageMock();

describe("logout", () => {
  it("clears the token from browser storage", () => {
    logout();
    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("profile")).toBeNull();
  });
});
