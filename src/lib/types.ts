// Content item interface
export interface ContentItem {
  id: string;
  positionX: number;
  positionY: number;
  positionZ: number;
  contentType: 'text' | 'link' | 'image' | 'document';
  content: string;
  title?: string;
}

// User interface
export interface User {
  id: string;
  email: string;
  username?: string;
  lastLogin?: Date;
  isActive: boolean;
}

// Session interface
export interface Session {
  id: string;
  userId: string;
  expiresAt: Date;
} 