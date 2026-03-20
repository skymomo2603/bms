# BMS Backend Architecture Guide

## Project Structure Overview

### Directory Layout

```
bms-backend/
├── src/
│   ├── controllers/          # Business logic for each resource
│   │   ├── heroBannerController.ts
│   │   └── roomController.ts
│   ├── routes/              # Route definitions (thin layer)
│   │   ├── heroBannerRoutes.ts
│   │   └── roomRoutes.ts
│   ├── types/               # TypeScript types & interfaces
│   │   └── index.ts
│   ├── middleware/          # Express middleware (auth, validation, etc)
│   ├── utils/              # Utility functions
│   ├── models/             # Data models (if needed)
│   ├── prisma.ts           # Prisma client connection
│   └── index.ts            # Main server file
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Database migrations
└── package.json
```

## Architecture Pattern: MVC (Modified)

### 1. **Controllers** (`src/controllers/`)

- Contains all **business logic** and **database operations**
- Each controller file handles one resource (e.g., `heroBannerController.ts`)
- Functions are async and handle:
  - Input validation
  - Database queries via Prisma
  - Error handling
  - HTTP response formatting

**Example Structure:**

```typescript
export const getHeroBannerById = async (req: Request, res: Response) => {
  // 1. Extract and validate input
  // 2. Query database
  // 3. Handle errors
  // 4. Send response
};
```

### 2. **Routes** (`src/routes/`)

- **Thin layer** - just maps HTTP methods to controller functions
- No business logic here
- Clean and readable endpoint definitions

**Example:**

```typescript
router.get("/:id", getHeroBannerById); // HTTP GET → controller function
```

### 3. **Types** (`src/types/`)

- Centralized TypeScript types and interfaces
- Request/Response types for type safety
- Exported from Prisma schema

**Key Types:**

```typescript
CreateHeroBannerRequest; // For POST payload validation
UpdateHeroBannerRequest; // For PUT payload validation
HeroBanner; // Prisma model (auto-generated)
```

---

## Data Flow: Frontend → Backend → Database

### Request Journey

```
Frontend (Next.js)
    ↓
fetch(`${API_BASE_URL}/hero-banners`, { method: "POST", body: data })
    ↓
Backend (Express)
routes/heroBannerRoutes.ts
    ↓
controllers/heroBannerController.ts (createHeroBanner)
    ↓
prisma/schema.prisma (HeroBanner model)
    ↓
PostgreSQL Database
```

### Example: Creating a Hero Banner

**Frontend:** [bms-frontend/src/app/lib/api/heroBanner.ts](../../bms-frontend/src/app/lib/api/heroBanner.ts#L10-L23)

```typescript
await createHeroBanner({
  title: "Summer Sale",
  remarks: "Limited time offer",
  image: "url-to-image",
  status: "Active",
});
```

**HTTP Request:**

```
POST /hero-banners HTTP/1.1
Host: http://localhost:3000
Content-Type: application/json

{
  "title": "Summer Sale",
  "remarks": "Limited time offer",
  "image": "url-to-image",
  "status": "Active"
}
```

**Backend Flow:**

1. Route receives POST to `/hero-banners`
2. Calls `createHeroBanner` from controller
3. Controller validates input
4. Creates record in PostgreSQL via Prisma
5. Returns 201 with created object

**Response:**

```json
{
  "id": 1,
  "title": "Summer Sale",
  "remarks": "Limited time offer",
  "image": "url-to-image",
  "status": "Active",
  "createdAt": "2026-03-10T10:30:00Z",
  "updatedAt": "2026-03-10T10:30:00Z"
}
```

---

## Key Features in Implementation

### 1. **Error Handling**

- Try-catch blocks catch all errors
- Meaningful error messages
- Proper HTTP status codes:
  - `201` - Created (POST success)
  - `400` - Bad Request (validation error)
  - `404` - Not Found
  - `409` - Conflict (duplicate title)
  - `500` - Server Error

### 2. **Input Validation**

```typescript
validateCreateHeroBanner(data): string[]
validateUpdateHeroBanner(data): string[]
```

- Checks required fields
- Validates data types
- Checks enum values (Active/Inactive)
- Trims whitespace from strings
- Implemented in `src/utils/heroBanner.ts` to keep controllers focused on request handling

### 3. **Prisma Error Codes**

- `P2002` - Unique constraint violation
- `P2025` - Record not found
- See: https://www.prisma.io/docs/reference/api-reference/error-reference

### 4. **Type Safety**

- All functions have TypeScript types
- Request body validated against types
- Response always matches model shape
- Hero banner status is constrained in both TypeScript request types and Prisma schema

---

## API Endpoints

### Hero Banners

| Method | Endpoint            | Description                        | Status Code     |
| ------ | ------------------- | ---------------------------------- | --------------- |
| GET    | `/hero-banners`     | Get all banners (sorted by newest) | 200             |
| GET    | `/hero-banners/:id` | Get single banner by ID            | 200 / 404       |
| POST   | `/hero-banners`     | Create new banner                  | 201 / 400       |
| PUT    | `/hero-banners/:id` | Update banner                      | 200 / 400 / 404 |
| DELETE | `/hero-banners/:id` | Delete banner                      | 200 / 404       |

Hero Banner behavior notes:

- `status` defaults to `Active` if omitted on create
- only one hero banner remains `Active` at a time
- `status` is DB-constrained through Prisma enum-backed schema

### Rooms

| Method | Endpoint     | Description   |
| ------ | ------------ | ------------- |
| GET    | `/api/rooms` | Get all rooms |

---

## Environment Setup

Create `.env` file in `bms-backend/`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/bms_db
PORT=3000
NODE_ENV=development
```

Frontend `.env.local` in `bms-frontend/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## Professional Standards Applied

✅ **Separation of Concerns**

- Controllers handle logic
- Routes handle routing
- Types are centralized

✅ **DRY Principle**

- Validation in helper functions
- Reusable error handling
- No duplicate code

✅ **Meaningful Error Messages**

- Frontend can display to users
- Server logs for debugging

✅ **Type Safety**

- Full TypeScript coverage
- Interface validation
- No `any` types where possible

✅ **RESTful API Design**

- Standard HTTP methods
- Proper status codes
- Resource-based naming

✅ **Scalability**

- Easy to add new resources
- Follow same pattern for Rooms, Users, etc.
- Maintainable as project grows

---

## Suggested Improvements

### 1. **Standardize Route Prefixes**

Currently inconsistent:

- `/hero-banners` (no prefix)
- `/api/rooms` (with `/api` prefix)

**Recommendation:** Use one pattern:

```typescript
app.use("/api/hero-banners", heroBannerRoutes); // OR
app.use("/api/rooms", roomRoutes);
```

### 2. **Add Request/Response Logging Middleware**

```typescript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

### 3. **Standardize Validation Utilities**

Hero Banner validation is already extracted into `src/utils/heroBanner.ts`.

**Recommendation:** apply the same pattern to other resources so controllers stay thin and consistent.

### 4. **Add Error Handling Middleware**

Create a custom error handler class for consistent error responses:

```typescript
class ApiError extends Error {
  constructor(statusCode: number, message: string) {}
}
```

### 5. **Add Request ID for Tracing**

Help debug requests flowing through your system:

```typescript
const requestId = req.headers["x-request-id"] || generateId();
```

### 6. **Refine CORS Configuration**

CORS is already configured in `src/index.ts`.

**Recommendation:** move allowed origins into environment variables so staging and production can be configured without code changes.

---

## Testing the Endpoints

### Using cURL

```bash
# Get all banners
curl http://localhost:3000/hero-banners

# Create banner
curl -X POST http://localhost:3000/hero-banners \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Banner",
    "remarks": "Test",
    "image": "https://example.com/image.jpg",
    "status": "Active"
  }'

# Get single banner
curl http://localhost:3000/hero-banners/1

# Update banner
curl -X PUT http://localhost:3000/hero-banners/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'

# Delete banner
curl -X DELETE http://localhost:3000/hero-banners/1
```

### Using Postman

1. Import the collection
2. Set environment variable: `api_url = http://localhost:3000`
3. Test each endpoint

---

## How to Extend with New Resources

To add a new resource (e.g., `Blog`):

1. **Add to Prisma Schema** (`prisma/schema.prisma`)

   ```prisma
   model Blog {
     id Int @id @default(autoincrement())
     title String
     content String
     createdAt DateTime @default(now())
     updatedAt DateTime @updatedAt
     @@schema("content")
   }
   ```

2. **Create Migration**

   ```bash
   npx prisma migrate dev --name add_blog
   ```

3. **Add Types** (`src/types/index.ts`)

   ```typescript
   export interface CreateBlogRequest {
     title: string;
     content: string;
   }
   ```

4. **Create Controller** (`src/controllers/blogController.ts`)

   ```typescript
   export const createBlog = async (req: Request, res: Response) => {
     // Follow same pattern as heroBannerController
   };
   ```

5. **Create Routes** (`src/routes/blogRoutes.ts`)

   ```typescript
   router.post("/", createBlog);
   // ... etc
   ```

6. **Mount in Main File** (`src/index.ts`)
   ```typescript
   app.use("/api/blogs", blogRoutes);
   ```

---

## Key Takeaways

1. **Separation of Concerns** keeps code organized and maintainable
2. **Type Safety** prevents runtime errors
3. **Error Handling** makes debugging and UX better
4. **Validation** ensures data integrity
5. **RESTful Design** follows web standards
6. **Comments & Documentation** help future developers
7. **Contract Alignment** keeps frontend DTOs, backend request types, and database constraints synchronized

Study this pattern and apply it to all future features!
