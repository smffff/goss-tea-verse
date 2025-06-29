import { useState, useCallback, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

// Generic loading state hook
export const useLoadingState = (initialState = false) => {
  const [isLoading, setIsLoading] = useState(initialState);
  
  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading = useCallback(() => setIsLoading(false), []);
  
  return {
    isLoading,
    startLoading,
    stopLoading,
    withLoading: useCallback(async (fn: () => Promise<void>) => {
      startLoading();
      try {
        await fn();
      } finally {
        stopLoading();
      }
    }, [startLoading, stopLoading])
  };
};

// Generic error state hook
export const useErrorState = () => {
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const setErrorWithToast = useCallback((message: string, variant: 'default' | 'destructive' = 'destructive') => {
    setError(message);
    toast({
      title: "Error",
      description: message,
      variant
    });
  }, [toast]);
  
  const clearError = useCallback(() => setError(null), []);
  
  return {
    error,
    setError,
    setErrorWithToast,
    clearError
  };
};

// Generic form state hook
export const useFormState = <T extends Record<string, any>>(initialState: T) => {
  const [formData, setFormData] = useState<T>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  
  const updateField = useCallback((field: keyof T, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);
  
  const updateForm = useCallback((updates: Partial<T>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);
  
  const resetForm = useCallback(() => {
    setFormData(initialState);
    setErrors({});
    setIsSubmitting(false);
  }, [initialState]);
  
  const setFieldError = useCallback((field: keyof T, message: string) => {
    setErrors(prev => ({ ...prev, [field]: message }));
  }, []);
  
  const clearFieldError = useCallback((field: keyof T) => {
    setErrors(prev => ({ ...prev, [field]: undefined }));
  }, []);
  
  const validateForm = useCallback((validator: (data: T) => Partial<Record<keyof T, string>>) => {
    const validationErrors = validator(formData);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  }, [formData]);
  
  return {
    formData,
    isSubmitting,
    errors,
    updateField,
    updateForm,
    resetForm,
    setFieldError,
    clearFieldError,
    validateForm,
    setIsSubmitting
  };
};

// Generic async operation hook
export const useAsyncOperation = <T = any>() => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const execute = useCallback(async (operation: () => Promise<T>, options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: string) => void;
    showToast?: boolean;
    successMessage?: string;
    errorMessage?: string;
  }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await operation();
      setData(result);
      
      if (options?.showToast && options?.successMessage) {
        toast({
          title: "Success",
          description: options.successMessage
        });
      }
      
      options?.onSuccess?.(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Operation failed';
      setError(errorMessage);
      
      if (options?.showToast) {
        toast({
          title: "Error",
          description: options?.errorMessage || errorMessage,
          variant: "destructive"
        });
      }
      
      options?.onError?.(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);
  
  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);
  
  return {
    data,
    isLoading,
    error,
    execute,
    reset
  };
};

// Generic debounced value hook
export const useDebouncedValue = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
};

// Generic local storage hook
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });
  
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);
  
  return [storedValue, setValue] as const;
};

// Generic interval hook
export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback);
  
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  
  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

// Generic timeout hook
export const useTimeout = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback);
  
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  
  useEffect(() => {
    if (delay !== null) {
      const id = setTimeout(() => savedCallback.current(), delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
};

// Generic click outside hook
export const useClickOutside = (ref: React.RefObject<HTMLElement>, handler: () => void) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };
    
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

// Generic keyboard hook
export const useKeyboard = (key: string, callback: () => void, dependencies: any[] = []) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === key) {
        callback();
      }
    };
    
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [key, callback, ...dependencies]);
};

// Generic scroll hook
export const useScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollX, setScrollX] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setScrollX(window.scrollX);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return { scrollY, scrollX };
};

// Generic window size hook
export const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return size;
}; 