import { UserPublic } from "./UserPublic";

class UserFunctions {
  static getUserToken(): string | null {
    return localStorage.getItem("user.token");
  }

  static setUserToken(userToken: string): void {
    localStorage.setItem("user.token", userToken);

    window.dispatchEvent(new Event("User token set"));
  }
  
  static setUserData(user: UserPublic): void {
    localStorage.setItem("user.data", JSON.stringify(user));

    window.dispatchEvent(new Event("User logged in"));
  }

  static getUser(): UserPublic | null {
    try {
      return JSON.parse(localStorage.getItem("user.data") || "");
    } catch {
      return null;
    }
  }

  static isLoggedIn(): boolean {
    return this.getUser() ? true : false;
  }

  static isAdministrator(): boolean {
    return this.getUser()?.roles?.includes("administrator") ?? false;
  }

  static RemoveUser() {
    localStorage.removeItem("user.token");
    localStorage.removeItem("user.data");
    window.dispatchEvent(new Event("User logged out"));
  }
}

export default UserFunctions;
