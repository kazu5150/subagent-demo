/**
 * APIハンドラーモジュール
 * エラーハンドリングのパターンを含む
 */

import { UserService } from "./user-service";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export class ApiHandler {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async handleCreateUser(name: string, email: string): Promise<ApiResponse<{ id: string }>> {
    try {
      if (!name || !email) {
        return { success: false, error: "Name and email are required" };
      }

      const existingUser = this.userService.findByEmail(email);
      if (existingUser) {
        return { success: false, error: "Email already exists" };
      }

      const user = this.userService.createUser(name, email);
      return { success: true, data: { id: user.id } };
    } catch (error) {
      return { success: false, error: "Internal server error" };
    }
  }

  async handleGetUser(id: string): Promise<ApiResponse<{ name: string; email: string }>> {
    try {
      const user = this.userService.getUser(id);
      if (!user) {
        return { success: false, error: "User not found" };
      }
      return { success: true, data: { name: user.name, email: user.email } };
    } catch (error) {
      return { success: false, error: "Internal server error" };
    }
  }

  async handleDeleteUser(id: string): Promise<ApiResponse<void>> {
    try {
      const deleted = this.userService.deleteUser(id);
      if (!deleted) {
        return { success: false, error: "User not found" };
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: "Internal server error" };
    }
  }
}
