
// Utility to help identify and repair common syntax issues
export const syntaxRepair = {
  // Common patterns that need fixing
  patterns: {
    incompleteConditional: /if \(process\.env\.NODE_ENV === "development"\) \{[^}]*$/,
    missingTryBlock: /^\s*secureLog\./,
    unclosedBrace: /\{[^}]*$/
  },

  // Fix conditional logging blocks
  fixConditionalLogging: (content: string): string => {
    return content.replace(
      /if \(process\.env\.NODE_ENV === "development"\) \{\s*secureLog\./g,
      'secureLog.'
    );
  },

  // Ensure proper try-catch structure  
  ensureTryCatch: (content: string): string => {
    const lines = content.split('\n');
    const fixedLines: string[] = [];
    let inTryBlock = false;
    let braceCount = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Count braces to track block nesting
      braceCount += (line.match(/\{/g) || []).length;
      braceCount -= (line.match(/\}/g) || []).length;
      
      fixedLines.push(line);
    }

    return fixedLines.join('\n');
  }
};
