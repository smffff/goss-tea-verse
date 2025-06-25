
// Re-export from the correct location with CTea personality
export { useToast, toast } from "@/hooks/use-toast";

// Custom CTea toast messages
export const cteaToasts = {
  teaSpilled: (title = "Tea Spilled! 🫖") => ({
    title,
    description: "Your gossip is now brewing in the feed. Watch the reactions roll in!",
  }),
  
  walletConnected: (title = "Wallet Connected! 💰") => ({
    title,
    description: "You're now ready to earn $TEA and build your $SOAP reputation!",
  }),
  
  reactionAdded: (type: string) => ({
    title: "Reaction Added! 🔥",
    description: `You ${type} this tea. Your taste is impeccable.`,
  }),
  
  tipSent: (amount?: string) => ({
    title: "Tip Sent! 💸",
    description: `Your generosity is noted. ${amount ? `${amount} sent!` : 'The recipient will remember this.'}`,
  }),
  
  badgeEarned: (badge: string) => ({
    title: "New Badge Earned! 🏆",
    description: `You unlocked "${badge}" - flex those achievements!`,
  }),
  
  errorGeneric: (message?: string) => ({
    title: "Oops! Something Broke 😤",
    description: message || "Even the best gossip networks have hiccups. Try again!",
    variant: "destructive" as const,
  }),
  
  copySuccess: (item = "text") => ({
    title: "Copied! 📋",
    description: `${item} copied to clipboard. Now go spread the word!`,
  }),
  
  loginRequired: () => ({
    title: "Login Required 🔐",
    description: "Connect your wallet to unlock this feature and start earning!",
    variant: "destructive" as const,
  }),
  
  featureComingSoon: () => ({
    title: "Coming Soon! 🚀",
    description: "This feature is brewing... Stay tuned for the hottest updates!",
  }),
};
