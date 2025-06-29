import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';

// Base service class with common functionality
export abstract class BaseService {
  protected logError(message: string, error: unknown) {
    secureLog.error(`[${this.constructor.name}] ${message}:`, error);
  }

  protected logInfo(message: string, data?: unknown) {
    secureLog.info(`[${this.constructor.name}] ${message}`, data);
  }

  protected handleSupabaseError(error: any): never {
    const message = error?.message || 'Database operation failed';
    this.logError('Supabase error', error);
    throw new Error(message);
  }

  protected async withRetry<T>(
    operation: () => Promise<T>,
    maxRetries = 3,
    delay = 1000
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        if (attempt === maxRetries) {
          throw lastError;
        }
        
        this.logInfo(`Retry attempt ${attempt}/${maxRetries} failed, retrying in ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff
      }
    }
    
    throw lastError!;
  }
}

// Generic CRUD service
export class CrudService<T> extends BaseService {
  constructor(
    private tableName: string,
    private idField: keyof T = 'id' as keyof T
  ) {
    super();
  }

  async create(data: Omit<T, typeof this.idField>): Promise<T> {
    try {
      const { data: result, error } = await supabase
        .from(this.tableName)
        .insert(data)
        .select()
        .single();

      if (error) this.handleSupabaseError(error);
      return result;
    } catch (error) {
      this.logError('Create operation failed', error);
      throw error;
    }
  }

  async getById(id: string | number): Promise<T | null> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq(this.idField as string, id)
        .single();

      if (error && error.code !== 'PGRST116') this.handleSupabaseError(error);
      return data;
    } catch (error) {
      this.logError('Get by ID operation failed', error);
      throw error;
    }
  }

  async getAll(filters?: Record<string, any>): Promise<T[]> {
    try {
      let query = supabase.from(this.tableName).select('*');
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      const { data, error } = await query;
      if (error) this.handleSupabaseError(error);
      return data || [];
    } catch (error) {
      this.logError('Get all operation failed', error);
      throw error;
    }
  }

  async update(id: string | number, updates: Partial<T>): Promise<T> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .update(updates)
        .eq(this.idField as string, id)
        .select()
        .single();

      if (error) this.handleSupabaseError(error);
      return data;
    } catch (error) {
      this.logError('Update operation failed', error);
      throw error;
    }
  }

  async delete(id: string | number): Promise<void> {
    try {
      const { error } = await supabase
        .from(this.tableName)
        .delete()
        .eq(this.idField as string, id);

      if (error) this.handleSupabaseError(error);
    } catch (error) {
      this.logError('Delete operation failed', error);
      throw error;
    }
  }

  async count(filters?: Record<string, any>): Promise<number> {
    try {
      let query = supabase.from(this.tableName).select('*', { count: 'exact', head: true });
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      const { count, error } = await query;
      if (error) this.handleSupabaseError(error);
      return count || 0;
    } catch (error) {
      this.logError('Count operation failed', error);
      throw error;
    }
  }
}

// Authentication service
export class AuthService extends BaseService {
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) this.handleSupabaseError(error);
      return data;
    } catch (error) {
      this.logError('Sign in failed', error);
      throw error;
    }
  }

  async signUp(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });

      if (error) this.handleSupabaseError(error);
      return data;
    } catch (error) {
      this.logError('Sign up failed', error);
      throw error;
    }
  }

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) this.handleSupabaseError(error);
    } catch (error) {
      this.logError('Sign out failed', error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) this.handleSupabaseError(error);
      return user;
    } catch (error) {
      this.logError('Get current user failed', error);
      throw error;
    }
  }

  async resetPassword(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) this.handleSupabaseError(error);
    } catch (error) {
      this.logError('Password reset failed', error);
      throw error;
    }
  }
}

// File upload service
export class FileUploadService extends BaseService {
  async uploadFile(
    bucket: string,
    path: string,
    file: File,
    options?: {
      cacheControl?: string;
      upsert?: boolean;
    }
  ) {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, options);

      if (error) this.handleSupabaseError(error);
      return data;
    } catch (error) {
      this.logError('File upload failed', error);
      throw error;
    }
  }

  async getPublicUrl(bucket: string, path: string) {
    try {
      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(path);

      return data.publicUrl;
    } catch (error) {
      this.logError('Get public URL failed', error);
      throw error;
    }
  }

  async deleteFile(bucket: string, path: string) {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path]);

      if (error) this.handleSupabaseError(error);
    } catch (error) {
      this.logError('File deletion failed', error);
      throw error;
    }
  }
}

// Rate limiting service
export class RateLimitService extends BaseService {
  private limits = new Map<string, { count: number; resetTime: number }>();

  async checkRateLimit(
    key: string,
    limit: number,
    windowMs: number
  ): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
    const now = Date.now();
    const current = this.limits.get(key);

    if (!current || now > current.resetTime) {
      // Reset or create new limit
      this.limits.set(key, {
        count: 1,
        resetTime: now + windowMs
      });
      return { allowed: true, remaining: limit - 1, resetTime: now + windowMs };
    }

    if (current.count >= limit) {
      return { allowed: false, remaining: 0, resetTime: current.resetTime };
    }

    // Increment count
    current.count++;
    this.limits.set(key, current);

    return { 
      allowed: true, 
      remaining: limit - current.count, 
      resetTime: current.resetTime 
    };
  }

  async resetRateLimit(key: string): Promise<void> {
    this.limits.delete(key);
  }
}

// Cache service
export class CacheService extends BaseService {
  private cache = new Map<string, { data: any; expiry: number }>();

  set(key: string, data: any, ttlMs: number = 5 * 60 * 1000): void {
    const expiry = Date.now() + ttlMs;
    this.cache.set(key, { data, expiry });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Clean up expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }
}

// Analytics service
export class AnalyticsService extends BaseService {
  async trackEvent(
    event: string,
    properties?: Record<string, any>,
    userId?: string
  ) {
    try {
      // Send to Supabase analytics table
      const { error } = await supabase
        .from('analytics_events')
        .insert({
          event,
          properties: properties || {},
          user_id: userId,
          timestamp: new Date().toISOString()
        });

      if (error) this.logError('Analytics tracking failed', error);
      
      // Could also send to external analytics services here
      this.logInfo('Event tracked', { event, properties, userId });
    } catch (error) {
      this.logError('Analytics tracking failed', error);
    }
  }

  async trackPageView(page: string, userId?: string) {
    await this.trackEvent('page_view', { page }, userId);
  }

  async trackUserAction(action: string, properties?: Record<string, any>, userId?: string) {
    await this.trackEvent('user_action', { action, ...properties }, userId);
  }
}

// Export service instances
export const authService = new AuthService();
export const fileUploadService = new FileUploadService();
export const rateLimitService = new RateLimitService();
export const cacheService = new CacheService();
export const analyticsService = new AnalyticsService();

// Export generic CRUD services for common tables
export const teaSubmissionsService = new CrudService<any>('tea_submissions');
export const betaCodesService = new CrudService<any>('beta_codes');
export const usersService = new CrudService<any>('users'); 