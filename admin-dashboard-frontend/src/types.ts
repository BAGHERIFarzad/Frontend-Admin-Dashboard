export interface DashboardStats {
  emails: number;
  projects: number;
  users: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  createdAt?: string;
}

