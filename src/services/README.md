# API Services Setup

This project uses axios for HTTP requests with a centralized configuration and service-based architecture.

## Configuration

### Base Axios Instance (`src/lib/axios.ts`)

The base axios instance is configured with:
- Base URL from environment variable `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:3001/api`)
- 10-second timeout
- JSON content type headers
- Automatic token injection from localStorage
- Global error handling and authentication redirects

### Environment Variables

Add to your `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Services

### Authentication Service (`src/services/auth/authService.ts`)

Handles user authentication:
- Login
- Register
- Logout
- Get current user
- Refresh token

### User Service (`src/services/user/userService.ts`)

Manages user data:
- Get profile
- Update profile
- Get user by ID
- Get all users (admin)
- Delete account

### Places Service (`src/services/places/placesService.ts`)

Manages places/cafes:
- Get places with filters
- Get place by ID
- Create/update/delete places
- Search by category
- Search nearby

## Usage Examples

### Using Services Directly

```typescript
import { authService, userService, placesService } from '@/services';

// Login
const loginData = await authService.login({
  email: 'user@example.com',
  password: 'password'
});

// Get user profile
const profile = await userService.getProfile();

// Get places
const places = await placesService.getPlaces({
  category: 'cafe',
  priceRange: 'medium'
});
```

### Using with React Query

```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { placesService } from '@/services';

// Query places
const { data: places, isLoading } = useQuery({
  queryKey: ['places'],
  queryFn: () => placesService.getPlaces()
});

// Create place mutation
const createPlaceMutation = useMutation({
  mutationFn: placesService.createPlace,
  onSuccess: () => {
    // Invalidate and refetch places
    queryClient.invalidateQueries({ queryKey: ['places'] });
  }
});
```

### Using Custom Hooks

```typescript
import { useAuth } from '@/hooks/useAuth';

function LoginComponent() {
  const { login, isLoggingIn, loginError, isAuthenticated } = useAuth();

  const handleLogin = () => {
    login({
      email: 'user@example.com',
      password: 'password'
    });
  };

  if (isAuthenticated) {
    return <div>Welcome back!</div>;
  }

  return (
    <button onClick={handleLogin} disabled={isLoggingIn}>
      {isLoggingIn ? 'Logging in...' : 'Login'}
    </button>
  );
}
```

## Error Handling

The axios configuration includes automatic error handling:
- 401: Redirects to login page and clears token
- 403: Logs forbidden access
- 404: Logs resource not found
- 500: Logs server error
- Network errors: Logs network issues

## Authentication Flow

1. User logs in/registers → token stored in localStorage
2. Subsequent requests automatically include Authorization header
3. 401 responses trigger automatic logout and redirect
4. Token can be refreshed using `authService.refreshToken()`

## Adding New Services

1. Create a new service file in `src/services/[serviceName]/`
2. Import and use the `apiClient` from `@/lib/axios`
3. Define TypeScript interfaces for request/response data
4. Export the service from `src/services/index.ts`
5. Create custom hooks if needed for React Query integration 