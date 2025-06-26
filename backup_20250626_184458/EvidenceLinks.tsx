import React from 'react';
import { ExternalLink } from 'lucide-react';

interface EvidenceLinksProps {
  evidenceUrls: string[] | null;
}

const EvidenceLinks = ({ evidenceUrls }: EvidenceLinksProps) => {
  if (!evidenceUrls || evidenceUrls.length === 0) {
    return null;
  }

  return (
    <div className="mb-4 space-y-2">
      <p className="text-sm text-ctea-teal font-medium">Evidence:</p>
      {evidenceUrls.map((url, index) => (
        <a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-ctea-teal hover:text-ctea-cyan transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          <span className="text-sm underline">Evidence {index + 1}</span>
        </a>
      ))}
    </div>
  );
};

export default EvidenceLinks;
