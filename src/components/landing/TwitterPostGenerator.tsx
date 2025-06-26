
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Copy, Twitter, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TwitterPostGenerator: React.FC = () => {
  const { toast } = useToast();
  const [currentPost, setCurrentPost] = useState('');

  const twitterPosts = [
    "🚧 Building in public: Just refactored CTea Newsroom's codebase into smaller, focused components! 📦\n\n✅ Fixed critical build errors\n✅ Improved type safety\n✅ Better code organization\n\nThe satisfaction of clean code hitting different 😤\n\n#BuildInPublic #TypeScript #React",
    
    "Day [X] of building @CTea_News 🫖\n\nJust spent hours debugging auth flows and it's finally working smooth as silk ✨\n\nThere's something beautiful about watching error-free builds after a refactor session 🎯\n\n#BuildInPublic #WebDev #CryptoTech",
    
    "Real talk: Debugging is 80% of development 🐛\n\nJust fixed:\n• React Hook violations\n• TypeScript any types\n• Build configuration issues\n• Auth error handling\n\nCTea Newsroom is getting more solid by the day 💪\n\n#BuildInPublic #DebuggingLife",
    
    "CTea update 🫖☕:\n\n📦 Codebase refactored into focused components\n🔧 Fixed all critical build errors\n🎯 Enhanced type safety across the app\n🚀 Ready for production deployment\n\nBuilding in public hits different when everything clicks! 🔥\n\n#BuildInPublic #CTea",
    
    "The developer life cycle:\n\n1. Write code ✍️\n2. Break everything 💥\n3. Fix everything 🔧\n4. Feel like a genius 🧠\n5. Repeat 🔄\n\nCurrently at step 4 with CTea Newsroom 😎\n\n#BuildInPublic #DeveloperLife #CTea",
    
    "POV: Your build finally passes after 20 TypeScript errors 🎉\n\nJust got CTea Newsroom's auth system working flawlessly:\n• Enhanced validation\n• Proper error handling\n• Type-safe everywhere\n\nTime to ship! 🚀\n\n#BuildInPublic #TypeScript #Success"
  ];

  const generateRandomPost = () => {
    const randomPost = twitterPosts[Math.floor(Math.random() * twitterPosts.length)];
    setCurrentPost(randomPost);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentPost);
      toast({
        title: "Copied to clipboard! 📋",
        description: "Ready to share your building journey on Twitter",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please copy the text manually",
        variant: "destructive",
      });
    }
  };

  const openTwitter = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(currentPost)}`;
    window.open(tweetUrl, '_blank');
  };

  // Generate initial post
  React.useEffect(() => {
    if (!currentPost) {
      generateRandomPost();
    }
  }, [currentPost]);

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-ctea-darker to-ctea-dark border-ctea-teal/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Twitter className="w-5 h-5 text-ctea-teal" />
          Building in Public Generator
          <Badge variant="secondary" className="bg-ctea-teal/20 text-ctea-teal">
            #CTea
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={currentPost}
          onChange={(e) => setCurrentPost(e.target.value)}
          className="min-h-[150px] bg-ctea-darker border-ctea-teal/30 text-white resize-none"
          placeholder="Your building in public post will appear here..."
        />
        
        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={generateRandomPost}
            variant="outline"
            className="border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate New Post
          </Button>
          
          <Button
            onClick={copyToClipboard}
            variant="outline"
            className="border-ctea-purple/30 text-ctea-purple hover:bg-ctea-purple/10"
            disabled={!currentPost}
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy to Clipboard
          </Button>
          
          <Button
            onClick={openTwitter}
            className="bg-blue-500 hover:bg-blue-600 text-white"
            disabled={!currentPost}
          >
            <Twitter className="w-4 h-4 mr-2" />
            Post to Twitter
          </Button>
        </div>

        <div className="text-sm text-gray-400">
          <p>💡 Tips for building in public:</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Share your struggles and wins</li>
            <li>Be authentic about the development process</li>
            <li>Use relevant hashtags (#BuildInPublic #WebDev)</li>
            <li>Engage with the developer community</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default TwitterPostGenerator;
