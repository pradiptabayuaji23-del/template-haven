import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  Template,
  TemplatesResponse,
  CreateTemplateRequest,
  UpdateTemplateRequest,
  Order,
  OrdersResponse,
  CreateOrderRequest,
  User,
  UsersResponse,
} from '@/types';

const API_BASE_URL = 'http://localhost:8080/api/v1';

// Helper to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// Helper to make authenticated requests
const authFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  return fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });
};

// Auth API
export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await authFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await authFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Registration failed');
    return response.json();
  },
};

// Templates API (Public)
export const templatesApi = {
  getAll: async (): Promise<Template[]> => {
    const response = await authFetch('/templates');
    if (!response.ok) throw new Error('Failed to fetch templates');
    const data: TemplatesResponse = await response.json();
    return data.templates;
  },

  getById: async (id: string): Promise<Template> => {
    const response = await authFetch(`/templates/${id}`);
    if (!response.ok) throw new Error('Failed to fetch template');
    return response.json();
  },
};

// Admin API
export const adminApi = {
  createTemplate: async (data: CreateTemplateRequest): Promise<Template> => {
    const response = await authFetch('/admin/templates', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create template');
    return response.json();
  },

  updateTemplate: async (id: string, data: UpdateTemplateRequest): Promise<Template> => {
    const response = await authFetch(`/admin/templates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update template');
    return response.json();
  },

  deleteTemplate: async (id: string): Promise<void> => {
    const response = await authFetch(`/admin/templates/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete template');
  },

  getOrders: async (): Promise<Order[]> => {
    const response = await authFetch('/admin/orders');
    if (!response.ok) throw new Error('Failed to fetch orders');
    const data: OrdersResponse = await response.json();
    return data.orders;
  },

  getUsers: async (): Promise<User[]> => {
    const response = await authFetch('/admin/users');
    if (!response.ok) throw new Error('Failed to fetch users');
    const data: UsersResponse = await response.json();
    return data.users;
  },
};

// User API
export const userApi = {
  getOrders: async (): Promise<Order[]> => {
    const response = await authFetch('/user/orders');
    if (!response.ok) throw new Error('Failed to fetch orders');
    const data: OrdersResponse = await response.json();
    return data.orders;
  },

  createOrder: async (data: CreateOrderRequest): Promise<Order> => {
    const response = await authFetch('/user/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create order');
    return response.json();
  },
};
