
import React, { useMemo } from 'react';
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

  // Memoize localStorage checks to prevent re-renders
  const peekStartTime = useMemo(() => {
    return localStorage.getItem('ctea-peek-start');
  }, [accessLevel]); // Only re-check when accessLevel changes

  const isGuestWithoutPeek = accessLevel === 'guest' && !peekStartTime;
  const isGuestWithPeek = accessLevel === 'guest' && peekStartTime;

  // Show access gateway if no access or guest without peek
  if (isGuestWithoutPeek) {
    if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('🔐 Showing access gateway');
    return <EnhancedAccessGateway onAccessGranted={onAccessGranted} />;
  }

  // Show sneak peek mode with timer
  if (isGuestWithPeek) {
    if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('👀 Showing sneak peek mode');
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
    if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('👑 Showing admin dashboard');
    return (
      <>
        <AdminDashboard onLogout={onLogout} />
        <VersionTracker />
      </>
    );
  }

  // Show full app for authenticated/beta users
  if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('🎉 Showing full app for level:', accessLevel);
  return (
    <>
      <LiveTeaApp onLogout={onLogout} />
      <VersionTracker />
    </>
  );
};
