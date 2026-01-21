import type { Template, User, Order } from '@/types';

// Import generated template images
import saasDashboardImg from '@/assets/templates/saas-dashboard.jpg';
import ecommerceImg from '@/assets/templates/ecommerce.jpg';
import portfolioImg from '@/assets/templates/portfolio.jpg';
import landingImg from '@/assets/templates/landing.jpg';
import blogImg from '@/assets/templates/blog.jpg';
import apiDocsImg from '@/assets/templates/api-docs.jpg';

export const mockTemplates: Template[] = [
  {
    id: '1',
    title: 'SaaS Dashboard Pro',
    description: 'A complete admin dashboard template with charts, tables, and user management. Perfect for SaaS applications with dark mode support and responsive design.',
    price: 79,
    thumbnailUrl: saasDashboardImg,
    fileUrl: '/downloads/saas-dashboard.zip',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts'],
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'E-Commerce Starter',
    description: 'Full-featured e-commerce template with product listings, cart, checkout, and order management. Includes Stripe integration ready.',
    price: 99,
    thumbnailUrl: ecommerceImg,
    fileUrl: '/downloads/ecommerce-starter.zip',
    techStack: ['React', 'Next.js', 'Prisma', 'Stripe'],
    createdAt: '2024-01-20T10:00:00Z',
  },
  {
    id: '3',
    title: 'Portfolio Starter',
    description: 'Minimal and elegant portfolio template for developers and designers. Includes blog, projects showcase, and contact form.',
    price: 49,
    thumbnailUrl: portfolioImg,
    fileUrl: '/downloads/portfolio-starter.zip',
    techStack: ['React', 'Framer Motion', 'MDX'],
    createdAt: '2024-01-25T10:00:00Z',
  },
  {
    id: '4',
    title: 'Landing Page Builder',
    description: 'Conversion-optimized landing page template with multiple sections, testimonials, pricing tables, and CTA components.',
    price: 59,
    thumbnailUrl: landingImg,
    fileUrl: '/downloads/landing-builder.zip',
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    createdAt: '2024-02-01T10:00:00Z',
  },
  {
    id: '5',
    title: 'Blog Platform',
    description: 'Modern blog template with markdown support, categories, tags, and SEO optimization. Includes admin panel for content management.',
    price: 69,
    thumbnailUrl: blogImg,
    fileUrl: '/downloads/blog-platform.zip',
    techStack: ['Next.js', 'MDX', 'Contentlayer'],
    createdAt: '2024-02-05T10:00:00Z',
  },
  {
    id: '6',
    title: 'API Documentation',
    description: 'Clean API documentation template with interactive examples, code snippets, and search functionality.',
    price: 39,
    thumbnailUrl: apiDocsImg,
    fileUrl: '/downloads/api-docs.zip',
    techStack: ['React', 'TypeScript', 'Shiki'],
    createdAt: '2024-02-10T10:00:00Z',
  },
];

export const mockUsers: User[] = [
  {
    id: 'admin-1',
    email: 'admin@templates.com',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-1',
    email: 'john@example.com',
    role: 'user',
    createdAt: '2024-01-10T00:00:00Z',
  },
  {
    id: 'user-2',
    email: 'jane@example.com',
    role: 'user',
    createdAt: '2024-01-15T00:00:00Z',
  },
];

export const mockOrders: Order[] = [
  {
    id: 'order-1',
    userId: 'user-1',
    templateId: '1',
    amount: 79,
    status: 'paid',
    createdAt: '2024-02-01T10:00:00Z',
    template: mockTemplates[0],
  },
  {
    id: 'order-2',
    userId: 'user-1',
    templateId: '3',
    amount: 49,
    status: 'paid',
    createdAt: '2024-02-05T10:00:00Z',
    template: mockTemplates[2],
  },
  {
    id: 'order-3',
    userId: 'user-2',
    templateId: '2',
    amount: 99,
    status: 'paid',
    createdAt: '2024-02-10T10:00:00Z',
    template: mockTemplates[1],
  },
];

// Mock current user (for demo purposes)
export const mockCurrentUser: User | null = null;
