# Backend Specifications

## Database Schema (PostgreSQL)

### users
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| email | VARCHAR | User email (unique) |
| password_hash | VARCHAR | Hashed password |
| role | VARCHAR | "admin" or "user" |
| created_at | TIMESTAMP | Creation timestamp |

### templates
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| title | VARCHAR | Template name |
| description | TEXT | Full description |
| price | DECIMAL | Price in USD |
| thumbnail_url | VARCHAR | Preview image URL |
| file_url | VARCHAR | Download file URL |
| tech_stack | TEXT[] | Array of technologies |
| created_at | TIMESTAMP | Creation timestamp |

### orders
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to users |
| template_id | UUID | Foreign key to templates |
| amount | DECIMAL | Purchase amount |
| status | VARCHAR | "pending" or "paid" |
| created_at | TIMESTAMP | Creation timestamp |

---

## API Endpoints (REST)

Base URL: `http://localhost:8080/api/v1`

### Authentication

#### POST /auth/register
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```
**Response:** User object with JWT token

#### POST /auth/login
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```
**Response:** User object with JWT token

---

### Templates (Public)

#### GET /templates
**Description:** List all templates
**Response:**
```json
{
  "templates": [
    {
      "id": "uuid",
      "title": "string",
      "description": "string",
      "price": 49.99,
      "thumbnail_url": "string",
      "file_url": "string",
      "tech_stack": ["React", "TypeScript"],
      "created_at": "timestamp"
    }
  ]
}
```

#### GET /templates/{id}
**Description:** Get single template details
**Response:** Single template object

---

### Admin Endpoints (Protected - Admin Role Required)

#### POST /admin/templates
**Description:** Create new template
**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "price": 49.99,
  "thumbnail_url": "string",
  "file_url": "string",
  "tech_stack": ["React", "TypeScript"]
}
```

#### PUT /admin/templates/{id}
**Description:** Update existing template
**Request Body:** Same as POST

#### GET /admin/orders
**Description:** List all orders

#### GET /admin/users
**Description:** List all users

---

### User Endpoints (Protected - User Role Required)

#### GET /user/orders
**Description:** Get user's purchase history
**Response:**
```json
{
  "orders": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "template_id": "uuid",
      "amount": 49.99,
      "status": "paid",
      "created_at": "timestamp",
      "template": { ... }
    }
  ]
}
```

#### POST /user/orders
**Description:** Create new order (purchase template)
**Request Body:**
```json
{
  "template_id": "uuid"
}
```
