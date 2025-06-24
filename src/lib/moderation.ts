const bannedWords = ["bribe", "pump", "dump", "scam", "rug"];

export function moderateText(text: string): { clean: boolean; reason?: string } {
  for (const word of bannedWords) {
    if (text.toLowerCase().includes(word)) {
      return { clean: false, reason: `Text contains banned word: ${word}` };
    }
  }
  return { clean: true };
} 