
import React from 'react';
import EnhancedAccessGateway from '../../access/EnhancedAccessGateway';
import LiveTeaApp from '../LiveTeaApp';
import SneakPeekApp from '../SneakPeekApp';
import AdminDashboard from '../../admin/AdminDashboard';
import SneakPeekTimer from '../../access/SneakPeekTimer';
import VersionTracker from '../../access/VersionTracker';
import { useAccessControl } from '../../access/AccessControlProvider';
import type { AccessLevel } from '../../access/AccessControlProvider';

interface AppRendererProps {
  accessLevel: AccessLevel;
  onAccessGranted: (level: AccessLevel) => void;
  onLogout: () => void;
  onTimeExpired: () => void;
}

export const AppRenderer: React.FC<AppRendererProps> = ({
  accessLevel,
  onAccessGranted,
  onLogout,
  onTimeExpired
}) => {
  const { upgradeAccess } = useAccessControl();

  // Show access gateway if no access or guest without peek
  if (accessLevel === 'guest' && !localStorage.getItem('ctea-peek-start')) {
    console.log('🔐 Showing access gateway');
    return <EnhancedAccessGateway onAccessGranted={onAccessGranted} />;
  }

  // Show sneak peek mode with timer
  if (accessLevel === 'guest' && localStorage.getItem('ctea-peek-start')) {
    console.log('👀 Showing sneak peek mode');
    return (
      <>
        <SneakPeekTimer 
          onTimeExpired={onTimeExpired}
          onUpgrade={upgradeAccess}
        />
        <SneakPeekApp onUpgrade={upgradeAccess} />
        <VersionTracker />
      </>
    );
  }

  // Show admin dashboard
  if (accessLevel === 'admin') {
    console.log('👑 Showing admin dashboard');
    return (
      <>
        <AdminDashboard onLogout={onLogout} />
        <VersionTracker />
      </>
    );
  }

  // Show full app for authenticated/beta users
  console.log('🎉 Showing full app for level:', accessLevel);
  return (
    <>
      <LiveTeaApp onLogout={onLogout} />
      <VersionTracker />
    </>
  );
};
