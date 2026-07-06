export const MESSAGE = {
  COMMON: {
    SUCCESS: 'Operation completed successfully.',
    FAILED: 'Something went wrong.',
    NOT_FOUND: 'Resource not found.',
    UNAUTHORIZED: 'Unauthorized access.',
    FORBIDDEN: 'You do not have permission to perform this action.',
    VALIDATION_ERROR: 'Validation failed.',
    INTERNAL_SERVER_ERROR: 'Internal server error.',
  },

  AUTH: {
    LOGIN_SUCCESS: 'Login successful.',
    INVALID_CREDENTIALS: 'Invalid email or password.',
    TOKEN_MISSING: 'Access token is required.',
    TOKEN_INVALID: 'Invalid or expired access token.',
    ACCESS_DENIED: 'Access denied.',
    PROFILE_FETCHED: 'Profile retrieved successfully.',
    LOGOUT_SUCCESS: 'Logout successful.',
  },

  PRODUCT: {
    CREATED: 'Product created successfully.',
    UPDATED: 'Product updated successfully.',
    DELETED: 'Product deleted successfully.',
    FETCHED: 'Product retrieved successfully.',
    FETCHED_ALL: 'Products retrieved successfully.',
    NOT_FOUND: 'Product not found.',
    SKU_ALREADY_EXISTS: 'Product SKU already exists.',
    IMAGE_REQUIRED: 'Product image is required.',
    OUT_OF_STOCK: 'Product is out of stock.',
  },

  SALE: {
    CREATED: 'Sale created successfully.',
    FETCHED: 'Sale retrieved successfully.',
    FETCHED_ALL: 'Sales retrieved successfully.',
    NOT_FOUND: 'Sale not found.',
    INSUFFICIENT_STOCK: 'Insufficient stock available.',
  },

  DASHBOARD: {
    FETCHED: 'Dashboard data retrieved successfully.',
  },
} as const;
