// User Types
export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

// Template Types
export interface Template {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnailUrl: string;
  fileUrl: string;
  techStack: string[];
  createdAt: string;
}

export interface CreateTemplateRequest {
  title: string;
  description: string;
  price: number;
  thumbnailUrl: string;
  fileUrl: string;
  techStack: string[];
}

export interface UpdateTemplateRequest extends CreateTemplateRequest {
  id: string;
}

// Order Types
export type OrderStatus = 'pending' | 'paid';

export interface Order {
  id: string;
  userId: string;
  templateId: string;
  amount: number;
  status: OrderStatus;
  createdAt: string;
  template?: Template;
}

export interface CreateOrderRequest {
  templateId: string;
}

// API Response Types
export interface TemplatesResponse {
  templates: Template[];
}

export interface OrdersResponse {
  orders: Order[];
}

export interface UsersResponse {
  users: User[];
}
