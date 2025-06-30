// Debug utility to view error logs
export const debugErrorLog = {
  // Get all stored errors
  getErrors: () => {
    try {
      const errors = localStorage.getItem('ctea_error_log');
      return errors ? JSON.parse(errors) : [];
    } catch (error) {
      console.error('Failed to parse error log:', error);
      return [];
    }
  },

  // Clear all stored errors
  clearErrors: () => {
    try {
      localStorage.removeItem('ctea_error_log');
      console.log('Error log cleared');
    } catch (error) {
      console.error('Failed to clear error log:', error);
    }
  },

  // Print errors to console
  printErrors: () => {
    const errors = debugErrorLog.getErrors();
    if (errors.length === 0) {
      console.log('No errors found in localStorage');
      return;
    }

    console.group('CTea Error Log');
    errors.forEach((error: any, index: number) => {
      console.group(`Error ${index + 1} - ${error.timestamp}`);
      console.log('Message:', error.message);
      console.log('Component:', error.componentName);
      console.log('URL:', error.url);
      if (error.stack) {
        console.log('Stack:', error.stack);
      }
      if (error.componentStack) {
        console.log('Component Stack:', error.componentStack);
      }
      console.groupEnd();
    });
    console.groupEnd();
  },

  // Get the most recent error
  getLatestError: () => {
    const errors = debugErrorLog.getErrors();
    return errors.length > 0 ? errors[errors.length - 1] : null;
  }
};

// Auto-print errors on page load in development
if (process.env.NODE_ENV === 'development') {
  // Wait for page to load
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const errors = debugErrorLog.getErrors();
        if (errors.length > 0) {
          console.log('CTea Error Log found. Run debugErrorLog.printErrors() to view details.');
        }
      }, 1000);
    });
  }
}

export default debugErrorLog; 