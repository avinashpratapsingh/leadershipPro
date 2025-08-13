import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import * as Icons from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const { modules } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/leaderboard', label: 'Leaderboard', icon: 'Trophy' },
  ];

  if (user?.role === 'coach' || user?.role === 'admin') {
    navigationItems.push({ path: '/coach', label: 'Coach Dashboard', icon: 'Users' });
  }

  if (user?.role === 'admin') {
    navigationItems.push({ path: '/admin', label: 'Admin Panel', icon: 'Settings' });
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-16'} transition-all duration-300 bg-white shadow-lg border-r border-gray-200 flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className={`${sidebarOpen ? 'block' : 'hidden'} flex items-center space-x-3`}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <Icons.GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">LeadershipPro</h1>
                <p className="text-xs text-gray-500">Development Platform</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Icons.Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          {/* Main Navigation */}
          <div className="px-3 mb-6">
            {sidebarOpen && <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Navigation</h3>}
            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const IconComponent = Icons[item.icon as keyof typeof Icons] as React.ComponentType<any>;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="w-5 h-5 flex-shrink-0" />
                    {sidebarOpen && <span className="ml-3 font-medium">{item.label}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Curriculum Modules */}
          {user?.role === 'learner' && (
            <div className="px-3">
              {sidebarOpen && <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Curriculum</h3>}
              <nav className="space-y-1">
                {modules.map((module) => {
                  const IconComponent = Icons[module.icon as keyof typeof Icons] as React.ComponentType<any>;
                  const isActive = location.pathname === `/module/${module.id}`;
                  const progress = (module.completedLessons / module.totalLessons) * 100;
                  
                  return (
                    <Link
                      key={module.id}
                      to={`/module/${module.id}`}
                      className={`block px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center">
                        <IconComponent className="w-5 h-5 flex-shrink-0" />
                        {sidebarOpen && (
                          <div className="ml-3 flex-1 min-w-0">
                            <p className="font-medium truncate">{module.title}</p>
                            <div className="flex items-center mt-1">
                              <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                                <div
                                  className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                              <span className="ml-2 text-xs text-gray-500">
                                {module.completedLessons}/{module.totalLessons}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <img
              src={user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'}
              alt={user?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {sidebarOpen && (
              <div className="ml-3 flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{user?.name}</p>
                <p className="text-sm text-gray-500 truncate">{user?.position}</p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Logout"
            >
              <Icons.LogOut className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;