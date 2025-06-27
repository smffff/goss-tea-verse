
export const applySecurityHeaders = () => {
  // Apply security headers via meta tags
  const metaTags = [
    { name: 'X-Content-Type-Options', content: 'nosniff' },
    { name: 'X-Frame-Options', content: 'DENY' },
    { name: 'X-XSS-Protection', content: '1; mode=block' },
    { name: 'Referrer-Policy', content: 'strict-origin-when-cross-origin' },
    { name: 'Permissions-Policy', content: 'geolocation=(), microphone=(), camera=()' }
  ];

  metaTags.forEach(({ name, content }) => {
    const existing = document.querySelector(`meta[name="${name}"]`);
    if (!existing) {
      const meta = document.createElement('meta');
      meta.name = name;
      meta.content = content;
      document.head.appendChild(meta);
    }
  });
};

export const generateCSRFToken = (): string => {
  return crypto.randomUUID();
};
