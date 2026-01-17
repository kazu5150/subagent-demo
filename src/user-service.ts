/**
 * ユーザーサービスモジュール
 * サブエージェントのExploreタイプで探索する対象として使用
 */

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export class UserService {
  private users: Map<string, User> = new Map();

  createUser(name: string, email: string): User {
    const id = crypto.randomUUID();
    const user: User = {
      id,
      name,
      email,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  getUser(id: string): User | undefined {
    return this.users.get(id);
  }

  updateUser(id: string, updates: Partial<Omit<User, "id" | "createdAt">>): User | undefined {
    const user = this.users.get(id);
    if (!user) return undefined;

    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  deleteUser(id: string): boolean {
    return this.users.delete(id);
  }

  listUsers(): User[] {
    return Array.from(this.users.values());
  }

  findByEmail(email: string): User | undefined {
    return this.listUsers().find((user) => user.email === email);
  }
}
