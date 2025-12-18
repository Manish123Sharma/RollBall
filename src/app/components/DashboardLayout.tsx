import { ReactNode, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import { Shield, Upload, CheckCircle, Clock, XCircle, User, LogOut, Menu, X } from 'lucide-react';
import { cn } from './ui/utils';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      path: '/dashboard/upload',
      label: 'Upload Documents',
      icon: Upload,
    },
    {
      path: '/dashboard/verified',
      label: 'Verified Documents',
      icon: CheckCircle,
    },
    {
      path: '/dashboard/under-review',
      label: 'Under Review',
      icon: Clock,
    },
    {
      path: '/dashboard/rejected',
      label: 'Rejected Documents',
      icon: XCircle,
    },
    {
      path: '/dashboard/profile',
      label: 'Profile Settings',
      icon: User,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-[#0066CC]" />
          <h1 className="font-bold text-lg">DocVerify</h1>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "fixed md:relative top-0 left-0 z-40 w-64 h-full bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out",
        "md:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-[#0066CC]" />
            <div>
              <h1 className="font-bold text-lg">DocVerify</h1>
              <p className="text-xs text-gray-500">Secure Verification</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false); // Close sidebar on mobile after navigation
                }}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left',
                  isActive
                    ? 'bg-[#0066CC] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-10 h-10 rounded-full bg-[#0066CC] flex items-center justify-center text-white">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto md:ml-0 pt-16 md:pt-0">
        {children}
      </main>
    </div>
  );
}
