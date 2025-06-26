
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { getUserProfileWithVisibility } from '@/lib/api/identityVisibility';
import IdentityVisibilityToggle from '@/components/profile/IdentityVisibilityToggle';
import { Skeleton } from '@/components/ui/skeleton';

const Profile = () => {
  const { user, isAdmin, isModerator } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const isAdminOrMod = isAdmin || isModerator;

  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.wallet_address) return;
      
      try {
        const data = await getUserProfileWithVisibility(user.wallet_address);
        setProfileData(data);
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user?.wallet_address]);

  const handleVisibilityChange = (newVisibility: any) => {
    setProfileData((prev: any) => prev ? { ...prev, identity_visibility: newVisibility } : null);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center">
        <Card className="bg-ctea-dark/90 border-ctea-teal/20 p-6">
          <p className="text-white">Please connect your wallet to view your profile.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="bg-ctea-dark/90 border-ctea-teal/20 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <span>👤</span>
              User Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-white">
              <h3 className="text-sm font-medium text-gray-400">Wallet Address</h3>
              <p className="font-mono text-sm">
                {user.wallet_address?.slice(0, 6)}...{user.wallet_address?.slice(-4)}
              </p>
            </div>

            <div className="text-white">
              <h3 className="text-sm font-medium text-gray-400">Token Balance</h3>
              <p className="text-lg font-bold text-teal-400">
                {user.token_balance?.toLocaleString() || '0'} $TEA
              </p>
            </div>

            {profileData && (
              <div className="text-white">
                <h3 className="text-sm font-medium text-gray-400">Verification Level</h3>
                <p className="capitalize">
                  {profileData.verification_level || 'none'}
                </p>
              </div>
            )}

            {loading && (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-gray-700" />
                <Skeleton className="h-4 w-3/4 bg-gray-700" />
              </div>
            )}
          </CardContent>
        </Card>

        {profileData && isAdminOrMod && (
          <Card className="bg-ctea-dark/90 border-ctea-teal/20 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <span>🔒</span>
                Admin Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <IdentityVisibilityToggle
                userId={profileData.id}
                currentVisibility={profileData.identity_visibility || 'anon'}
                isAdminOrMod={isAdminOrMod}
                onVisibilityChange={handleVisibilityChange}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Profile;
