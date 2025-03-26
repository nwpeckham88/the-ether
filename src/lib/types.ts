// Content item interface
export interface ContentItem {
  id: string;
  positionX: number;
  positionY: number;
  positionZ: number;
  contentType?: string;
  content?: string;
  title?: string;
  [key: string]: any; // Allow other properties
}

// User interface
export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  isActive: boolean;
  lastLogin?: Date | null;
  createdAt?: Date;
}

// Session interface
export interface Session {
  id: string;
  userId: string;
  expiresAt: Date;
  userAgent?: string;
  createdAt?: Date;
} 