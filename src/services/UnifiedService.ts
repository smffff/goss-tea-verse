
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';

// Base service class with common functionality
export abstract class BaseService {
  protected logError(message: string, error: unknown) {
    secureLog.error(message, error);
  }

  protected logInfo(message: string, data?: unknown) {
    secureLog.info(message, data);
  }

  protected handleSupabaseError(error: any): never {
    this.logError('Supabase error', error);
    throw new Error(error.message || 'Database operation failed');
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
        lastError = error as Error;
        this.logError(`Attempt ${attempt} failed`, error);
        
        if (attempt === maxRetries) break;
        
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }
    
    throw lastError!;
  }
}

// Simplified CRUD service
export class CrudService extends BaseService {
  constructor(private tableName: string) {
    super();
  }

  async create(data: Record<string, any>): Promise<any> {
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

  async getById(id: string | number): Promise<any> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('id', id)
        .single();

      if (error && error.code !== 'PGRST116') this.handleSupabaseError(error);
      return data;
    } catch (error) {
      this.logError('Get by ID operation failed', error);
      throw error;
    }
  }

  async getAll(filters?: Record<string, any>): Promise<any[]> {
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

  async update(id: string | number, updates: Record<string, any>): Promise<any> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .update(updates)
        .eq('id', id)
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
        .eq('id', id);

      if (error) this.handleSupabaseError(error);
    } catch (error) {
      this.logError('Delete operation failed', error);
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
}

// Export service instances
export const authService = new AuthService();
export const teaSubmissionsService = new CrudService('tea_submissions');
export const betaCodesService = new CrudService('beta_codes');

// Export the main UnifiedService as a namespace
export const UnifiedService = {
  auth: authService,
  teaSubmissions: teaSubmissionsService,
  betaCodes: betaCodesService
};
