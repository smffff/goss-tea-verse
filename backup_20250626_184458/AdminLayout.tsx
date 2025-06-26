
import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Coffee, Home, Users, Flag, Settings, Shield, BarChart3, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const AdminLayout = () => {
  const { signOut, user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: BarChart3, exact: true },
    { path: '/admin/moderation', label: 'Moderation', icon: Flag },
    { path: '/admin/users', label: 'Users', icon: Users, adminOnly: true },
    { path: '/admin/settings', label: 'Settings', icon: Settings, adminOnly: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black">
      {/* Header */}
      <header className="bg-ctea-dark/90 backdrop-blur-lg border-b border-ctea-teal/20">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <NavLink to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-ctea-teal to-ctea-purple rounded-lg flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg text-white">CTEA ADMIN</span>
              </NavLink>
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4 text-ctea-teal" />
                <span className="text-sm text-ctea-teal">
                  {isAdmin ? 'Administrator' : 'Moderator'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">{user?.email}</span>
              <NavLink to="/home">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Site
                </Button>
              </NavLink>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleSignOut}
                className="text-gray-400 hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-ctea-dark/50 border-r border-ctea-teal/20 min-h-[calc(100vh-80px)]">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              if (item.adminOnly && !isAdmin) return null;
              
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-ctea-teal/20 text-ctea-teal'
                        : 'text-gray-400 hover:text-white hover:bg-ctea-teal/10'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
