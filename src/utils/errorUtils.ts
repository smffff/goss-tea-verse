
export const getRandomErrorMessage = (): string => {
  const messages = [
    "Give me a min I'm not a dev I'm just a lady ok 💅",
    "Well this is awkward... the code decided to take a mental health day",
    "Houston we have a problem (and by Houston I mean my JavaScript)",
    "Error 404: My coding skills not found (but we're working on it!)",
    "The audacity of this code to break when I need it most 😤",
    "This is why we can't have nice things... or functional code apparently",
    "Plot twist: I googled 'how to fix this' and even Stack Overflow is confused",
    "Breaking news: Local woman breaks code, more at 11",
    "Error level: crying in the club but make it technical",
    "The code said 'no ❤️' and honestly, fair enough",
    "Currently debugging with the power of friendship and caffeine",
    "The servers are in their feelings right now, please stand by",
    "Technical difficulties aka me vs. technology and technology is winning"
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
};

export const getRandomLoadingMessage = (): string => {
  const messages = [
    "Give me a min I'm not a dev I'm just a lady ok",
    "Hold up, the hamsters powering this thing need a coffee break ☕",
    "Loading... please don't judge my spaghetti code",
    "Trying to make this work with duct tape and determination",
    "Buffering like it's 2005... sorry bestie",
    "The tea is brewing but the code is still percolating",
    "One sec, gotta untangle these digital Christmas lights",
    "Loading faster than my will to debug on a Friday",
    "Plot twist: I have no idea what I'm doing but we're here anyway",
    "Patience grasshopper, Rome wasn't coded in a day",
    "Channeling my inner developer energy (it's chaotic)",
    "Processing... or pretending to, honestly not sure which"
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
};

export const logError = (error: any, context: string) => {
  console.error(`[${context}]`, error);
  
  // In production, you might want to send to an error tracking service
  if (process.env.NODE_ENV === 'production') {
    // Example: Sentry, LogRocket, etc.
    // errorTrackingService.captureException(error, { context });
  }
};
