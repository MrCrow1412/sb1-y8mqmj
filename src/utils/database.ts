// Simple in-memory database
interface User {
  id: string;
  name: string;
  pin: string;
}

class Database {
  private users: User[] = [];

  addUser(user: User) {
    this.users.push(user);
  }

  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }

  updateUser(updatedUser: User) {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
  }

  deleteUser(id: string) {
    this.users = this.users.filter(user => user.id !== id);
  }
}

export const db = new Database();