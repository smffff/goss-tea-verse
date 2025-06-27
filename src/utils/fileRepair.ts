
import { secureLog } from './secureLogging';

export class FileRepairUtility {
  static repairConditionalLogging(content: string): string {
    try {
      // Remove malformed conditional blocks
      let fixed = content.replace(
        /if \(process\.env\.NODE_ENV === "development"\) \{\s*if \(process\.env\.NODE_ENV === "development"\) \{[^}]*secureLog\./g,
        'secureLog.'
      );

      // Fix incomplete conditional blocks
      fixed = fixed.replace(
        /if \(process\.env\.NODE_ENV === "development"\) \{\s*secureLog\./g,
        'secureLog.'
      );

      // Remove orphaned closing braces from conditional blocks
      fixed = fixed.replace(/^\s*\}\s*$/gm, '');

      return fixed;
    } catch (error) {
      secureLog.error('Error repairing conditional logging:', error);
      return content;
    }
  }

  static ensureProperBraces(content: string): string {
    try {
      const lines = content.split('\n');
      const result: string[] = [];
      let braceCount = 0;
      let inFunction = false;
      
      for (const line of lines) {
        // Track function/component definitions
        if (line.includes('= (') || line.includes('function ') || line.includes('const ')) {
          inFunction = true;
        }
        
        // Count braces
        const openBraces = (line.match(/\{/g) || []).length;
        const closeBraces = (line.match(/\}/g) || []).length;
        
        braceCount += openBraces - closeBraces;
        result.push(line);
      }
      
      // Add missing closing braces if needed
      while (braceCount > 0) {
        result.push('};');
        braceCount--;
      }
      
      return result.join('\n');
    } catch (error) {
      secureLog.error('Error ensuring proper braces:', error);
      return content;
    }
  }
}
