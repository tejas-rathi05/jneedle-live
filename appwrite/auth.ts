import conf from "@/conf/conf";
import { Client, Account, ID, OAuthProvider } from "appwrite";
import service from "./config";
import { useAuthStore } from "@/lib/store/auth-store";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) {
    try {
      console.log(conf.appwriteUrl);
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        await service.createUser({
          email,
          password,
        });
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.error("Creating Account Failed:", error);
      throw new Error("Creating Account failed.");
    }
  }

  async login({ email, password }: { email: string; password: string }) {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      const user = await this.account.get();

      // Update Zustand store with user data
      const setUser = useAuthStore.getState().setUser;  // Access setUser from Zustand store
      setUser(user);

      return user;
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Login failed. Please check your credentials.");
    }
  }

  async googleLogin() {
    try {
      const res = this.account.createOAuth2Session(
        "google" as OAuthProvider,
        `${conf.baseURL}/login`,
        `${conf.baseURL}/fail`
      );
      console.log("Google Login: ", res);

      // Fetch current user after login
    const userData = await this.account.get();
    console.log("User Data: ", userData);

    // Update Zustand store with user data
    if (userData) {
      // Assuming you have the 'login' function in your Zustand store
      useAuthStore.getState().setUser(userData); // Call the 'login' function from your store to set user data
    }

    return res; // Return the OAuth session (optional)
      return res;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error: ", error)
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();

      const logout = useAuthStore.getState().logout;
      logout();
    } catch (error) {
      console.log("Appwrite service :: logout :: error: ", error);
    }
  }
}

const authService = new AuthService();

export default authService;
