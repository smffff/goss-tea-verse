import { useState } from 'react';
import Link from 'next/link';

export default function AboutCTeaBuilder() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm text-white opacity-60 hover:opacity-100 transition"
        title="About the builder"
      >
        🫖
      </button>

      {open && (
        <div className="absolute bottom-8 right-0 z-50 w-80 p-4 bg-black/90 border border-white rounded-lg text-white text-xs backdrop-blur">
          <div className="font-bold text-sm mb-2">Meet the Builder</div>
          <p>
            Crafted live with love, memes, and too much tea by{' '}
            <Link
              href="https://arena.social/ladyinvisible"
              className="underline hover:text-yellow-300"
              target="_blank"
            >
              Lady Invisible
            </Link>
            . Watch the chaos unfold:
          </p>
          <p className="mt-2">
            <Link
              href="https://arena.social/ladyinvisible"
              target="_blank"
              className="text-blue-400 hover:text-yellow-400 underline"
            >
              📺 Live stream build on Arena
            </Link>
          </p>
          <p className="mt-2 italic opacity-70">
            “Make CTea Great Again.” – Someone probably
          </p>
        </div>
      )}
    </div>
  );
} 