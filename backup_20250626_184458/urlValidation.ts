
// Simple URL validation utilities
export const validateUrl = (url: string): boolean => {
  if (!url?.trim()) return false;
  
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

export const validateUrls = (urls: string[]): { valid: string[]; invalid: string[] } => {
  const valid: string[] = [];
  const invalid: string[] = [];

  for (const url of urls) {
    if (!url?.trim()) continue;
    
    if (validateUrl(url)) {
      valid.push(url);
    } else {
      invalid.push(url);
    }
  }

  return { valid, invalid };
};

export const sanitizeUrl = (url: string): string => {
  return url.trim().replace(/[<>"']/g, '');
};
