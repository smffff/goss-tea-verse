
import React from 'react';

interface AnonymousCheckboxProps {
  isAnonymous: boolean;
  onChange: (isAnonymous: boolean) => void;
}

const AnonymousCheckbox: React.FC<AnonymousCheckboxProps> = ({
  isAnonymous,
  onChange
}) => {
  return (
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        id="anonymous"
        checked={isAnonymous}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 text-accent bg-ctea-dark/50 border-ctea-teal/30 rounded focus:ring-2 focus:ring-accent/50"
      />
      <label htmlFor="anonymous" className="text-gray-300 text-sm">
        Submit anonymously (recommended for maximum tea spilling)
      </label>
    </div>
  );
};

export default AnonymousCheckbox;
