import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';

interface ContactFieldsProps {
  email: string;
  wallet: string;
  emailError?: string;
  walletError?: string;
  onEmailChange: (email: string) => void;
  onWalletChange: (wallet: string) => void;
  onClearEmailError: () => void;
  onClearWalletError: () => void;
}

const ContactFields: React.FC<ContactFieldsProps> = ({
  email,
  wallet,
  emailError,
  walletError,
  onEmailChange,
  onWalletChange,
  onClearEmailError,
  onClearWalletError
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="email" className="text-gray-300">
          Email Address (Optional)
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com (optional)"
          value={email}
          onChange={(e) => {
            onEmailChange(e.target.value);
            onClearEmailError();
          }}
          className={`bg-ctea-dark/50 border-ctea-teal/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-accent/50 focus:border-accent ${
            emailError ? 'border-red-400' : ''
          }`}
        />
        {emailError && (
          <div className="flex items-center gap-1 text-red-400 text-sm mt-1">
            <AlertCircle className="w-3 h-3" />
            {emailError}
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="wallet" className="text-gray-300">
          Wallet Address (Optional)
        </Label>
        <Input
          id="wallet"
          placeholder="0x... or Solana address (optional)"
          value={wallet}
          onChange={(e) => {
            onWalletChange(e.target.value);
            onClearWalletError();
          }}
          className={`bg-ctea-dark/50 border-ctea-teal/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-accent/50 focus:border-accent ${
            walletError ? 'border-red-400' : ''
          }`}
        />
        {walletError && (
          <div className="flex items-center gap-1 text-red-400 text-sm mt-1">
            <AlertCircle className="w-3 h-3" />
            {walletError}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactFields;
