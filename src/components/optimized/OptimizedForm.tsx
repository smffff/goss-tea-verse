import React, { memo, useCallback, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useUnifiedState } from '@/hooks/useUnifiedState.tsx';
import { UnifiedService } from '@/services/UnifiedService';
import { useComponentPerformance } from '@/hooks/usePerformanceMonitor';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'select' | 'checkbox' | 'radio';
  placeholder?: string;
  required?: boolean;
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    custom?: (value: any) => string | null;
  };
  options?: { value: string; label: string }[];
}

interface FormConfig {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  submitLabel?: string;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  onCancel?: () => void;
  initialData?: Record<string, any>;
}

interface OptimizedFormProps {
  config: FormConfig;
  className?: string;
  showValidation?: boolean;
  autoSave?: boolean;
  autoSaveInterval?: number;
}

interface ValidationError {
  field: string;
  message: string;
}

// Memoized form field component
const FormFieldComponent = memo<{
  field: FormField;
  value: any;
  error?: string;
  onChange: (name: string, value: any) => void;
  onBlur: (name: string) => void;
  isTouched: boolean;
}>(({ field, value, error, onChange, onBlur, isTouched }) => {
  const { startRender, endRender } = useComponentPerformance(`FormField-${field.name}`);
  
  useEffect(() => {
    startRender();
    return () => {
      const renderTime = endRender();
      if (renderTime > 16) {
        console.warn(`FormField ${field.name} took ${renderTime.toFixed(2)}ms to render`);
      }
    };
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const newValue = field.type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : e.target.value;
    onChange(field.name, newValue);
  }, [field.name, field.type, onChange]);

  const handleBlur = useCallback(() => {
    onBlur(field.name);
  }, [field.name, onBlur]);

  const showError = isTouched && error;

  const renderField = () => {
    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            id={field.name}
            placeholder={field.placeholder}
            value={value || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            className={showError ? 'border-red-500' : ''}
          />
        );
      
      case 'select':
        return (
          <select
            id={field.name}
            value={value || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 border rounded-md bg-ctea-dark text-white ${
              showError ? 'border-red-500' : 'border-ctea-teal/30'
            }`}
          >
            <option value="">Select an option</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'checkbox':
        return (
          <input
            type="checkbox"
            id={field.name}
            checked={value || false}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-4 h-4 text-ctea-teal bg-ctea-dark border-ctea-teal/30 rounded focus:ring-ctea-teal"
          />
        );
      
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map(option => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-4 h-4 text-ctea-teal bg-ctea-dark border-ctea-teal/30"
                />
                <span className="text-white">{option.label}</span>
              </label>
            ))}
          </div>
        );
      
      default:
        return (
          <Input
            id={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={value || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            className={showError ? 'border-red-500' : ''}
          />
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-2"
    >
      <Label htmlFor={field.name} className="text-white">
        {field.label}
        {field.required && <span className="text-red-400 ml-1">*</span>}
      </Label>
      
      {renderField()}
      
      {showError && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="flex items-center gap-2 text-red-400 text-sm"
        >
          <XCircle className="w-4 h-4" />
          {error}
        </motion.div>
      )}
    </motion.div>
  );
});

FormFieldComponent.displayName = 'FormFieldComponent';

// Main optimized form component
const OptimizedForm: React.FC<OptimizedFormProps> = memo(({
  config,
  className = '',
  showValidation = true,
  autoSave = false,
  autoSaveInterval = 30000 // 30 seconds
}) => {
  const { startRender, endRender } = useComponentPerformance(`OptimizedForm-${config.id}`);
  
  const [formData, setFormData] = useUnifiedState<Record<string, any>>(
    `form-${config.id}`,
    config.initialData || {}
  );
  const [errors, setErrors] = useUnifiedState<Record<string, string>>(
    `form-errors-${config.id}`,
    {}
  );
  const [touched, setTouched] = useUnifiedState<Record<string, boolean>>(
    `form-touched-${config.id}`,
    {}
  );
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [lastSaved, setLastSaved] = React.useState<Date | null>(null);
  
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startRender();
    return () => {
      const renderTime = endRender();
      if (renderTime > 16) {
        console.warn(`OptimizedForm ${config.id} took ${renderTime.toFixed(2)}ms to render`);
      }
    };
  });

  // Validation function
  const validateField = useCallback((field: FormField, value: any): string | null => {
    if (field.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return `${field.label} is required`;
    }

    if (value && field.validation) {
      if (field.validation.minLength && value.length < field.validation.minLength) {
        return `${field.label} must be at least ${field.validation.minLength} characters`;
      }

      if (field.validation.maxLength && value.length > field.validation.maxLength) {
        return `${field.label} must be no more than ${field.validation.maxLength} characters`;
      }

      if (field.validation.pattern && !field.validation.pattern.test(value)) {
        return `${field.label} format is invalid`;
      }

      if (field.validation.custom) {
        return field.validation.custom(value);
      }
    }

    return null;
  }, []);

  // Validate all fields
  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    config.fields.forEach(field => {
      const error = validateField(field, formData[field.name]);
      if (error) {
        newErrors[field.name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [config.fields, formData, validateField, setErrors]);

  // Handle field change
  const handleFieldChange = useCallback((name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Auto-save functionality
    if (autoSave) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      
      autoSaveTimeoutRef.current = setTimeout(() => {
        // Save to localStorage or send to server
        localStorage.setItem(`form-draft-${config.id}`, JSON.stringify(formData));
        setLastSaved(new Date());
      }, autoSaveInterval);
    }
  }, [setFormData, errors, setErrors, autoSave, autoSaveInterval, config.id, formData]);

  // Handle field blur
  const handleFieldBlur = useCallback((name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const field = config.fields.find(f => f.name === name);
    if (field && showValidation) {
      const error = validateField(field, formData[name]);
      setErrors(prev => ({ ...prev, [name]: error || '' }));
    }
  }, [setTouched, config.fields, showValidation, validateField, formData, setErrors]);

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await config.onSubmit(formData);
      setSubmitStatus('success');
      
      // Clear form data on successful submission
      setFormData({});
      setTouched({});
      setErrors({});
      
      // Clear auto-saved draft
      if (autoSave) {
        localStorage.removeItem(`form-draft-${config.id}`);
      }
      
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm, config.onSubmit, formData, setFormData, setTouched, setErrors, autoSave, config.id]);

  // Handle cancel
  const handleCancel = useCallback(() => {
    if (config.onCancel) {
      config.onCancel();
    }
  }, [config.onCancel]);

  // Load auto-saved draft
  useEffect(() => {
    if (autoSave) {
      const saved = localStorage.getItem(`form-draft-${config.id}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setFormData(parsed);
        } catch (error) {
          console.error('Failed to load auto-saved form data:', error);
        }
      }
    }
  }, [autoSave, config.id, setFormData]);

  // Cleanup auto-save timeout
  useEffect(() => {
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, []);

  const hasErrors = Object.values(errors).some(error => error);
  const isFormValid = !hasErrors && Object.keys(formData).length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card className="bg-ctea-dark/50 border-ctea-teal/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            {config.title}
            {autoSave && lastSaved && (
              <Badge variant="outline" className="text-xs text-ctea-teal">
                Auto-saved {lastSaved.toLocaleTimeString()}
              </Badge>
            )}
          </CardTitle>
          {config.description && (
            <p className="text-gray-400 text-sm">{config.description}</p>
          )}
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {config.fields.map((field, index) => (
              <FormFieldComponent
                key={field.name}
                field={field}
                value={formData[field.name]}
                error={errors[field.name]}
                onChange={handleFieldChange}
                onBlur={handleFieldBlur}
                isTouched={touched[field.name] || false}
              />
            ))}

            {/* Submit Status */}
            {submitStatus === 'success' && (
              <Alert className="border-green-500/30 bg-green-500/10">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <AlertDescription className="text-green-400">
                  Form submitted successfully!
                </AlertDescription>
              </Alert>
            )}

            {submitStatus === 'error' && (
              <Alert className="border-red-500/30 bg-red-500/10">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-400">
                  Failed to submit form. Please try again.
                </AlertDescription>
              </Alert>
            )}

            {/* Form Actions */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-2">
                {config.onCancel && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                    className="border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10"
                  >
                    Cancel
                  </Button>
                )}
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting || !isFormValid}
                className="bg-gradient-to-r from-ctea-teal to-ctea-purple text-white hover:opacity-90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  config.submitLabel || 'Submit'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
});

OptimizedForm.displayName = 'OptimizedForm';

export default OptimizedForm; 