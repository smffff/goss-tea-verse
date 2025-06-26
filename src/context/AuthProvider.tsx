import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { upsertUserProfile } from '../lib/api/user';
import { rewardEarlyUser } from '../lib/api/rewards';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [user, setUser] = useState(null);
  const hasSynced = useRef(false);

  useEffect(() => {
    const syncUser = async () => {
      if (!address || hasSynced.current) return;
      hasSynced.current = true;
      try {
        // Upsert or update user profile in Supabase
        const { data: userProfile, error: upsertError } = await upsertUserProfile({ wallet_address: address });
        if (upsertError) {
          console.error('[AuthProvider] Failed to upsert user profile:', upsertError.message, { address });
          return;
        }
        setUser(userProfile);
        // Reward early user (if not already rewarded)
        try {
          await rewardEarlyUser(address);
        } catch (rewardErr) {
          console.warn('[AuthProvider] Reward error (may be already rewarded):', rewardErr.message, { address });
        }
      } catch (err) {
        console.error('[AuthProvider] Unexpected sync error:', err.message, { address });
      }
    };
    if (isConnected) syncUser();
  }, [address, isConnected]);

  // Reset on disconnect
  useEffect(() => {
    if (!isConnected) {
      setUser(null);
      hasSynced.current = false;
    }
  }, [isConnected]);

  return (
    <AuthContext.Provider value={{ user, disconnect }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}; 