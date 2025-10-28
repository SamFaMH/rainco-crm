import { ReactNode } from 'react';
import { Search, Bell, LogOut, LucideIcon, Settings, User, Menu, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useState } from 'react';

// Color constants from your palette
const COLORS = {
  primary: '#d72b1b',
  dark: '#202125',
  light: '#f2f3f5',
  primaryLight: '#e74c3c',
  primaryDark: '#c0392b',
  darkLight: '#2c2e33',
};

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface DashboardLayoutProps {
  children: ReactNode;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  menuItems: MenuItem[];
  onLogout: () => void;
}

export default function DashboardLayout({
  children,
  currentPage,
  setCurrentPage,
  menuItems,
  onLogout,
}: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between px-4 lg:px-6 py-4">
          <div className="flex items-center gap-6">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {/* Logo */}
            <div className="flex items-center gap-3">
              {/* Replace this div with your logo image */}
              <div className="flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="Rainco CRM Logo" 
                  className=" object-contain" 
                  onError={(e) => {
                    // Fallback if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    // You can show a fallback icon here if needed
                  }}
                />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">CRM</span>
                <p className="text-xs text-gray-500 hidden sm:block">shop.rainco.lk</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative w-80 hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search customers, orders, tickets..."
                className="pl-10 border-gray-300 focus:border-gray-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Search Button */}
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5 text-gray-600" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs border-2 border-white" 
                         style={{ backgroundColor: COLORS.primary }}>
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-white">
                <DropdownMenuLabel className="text-gray-900">Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-60 overflow-y-auto">
                  {[
                    { id: 1, message: 'New support ticket from Amara Silva', time: '2 min ago', unread: true },
                    { id: 2, message: 'Order #ORD-1234 has been delivered', time: '1 hour ago', unread: true },
                    { id: 3, message: 'Monthly sales target achieved', time: '2 hours ago', unread: false },
                    { id: 4, message: '5 new customer registrations', time: '3 hours ago', unread: false },
                  ].map((notification) => (
                    <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 cursor-pointer hover:bg-gray-50">
                      <div className="flex items-start gap-3 w-full">
                        {notification.unread && (
                          <div className="h-2 w-2 rounded-full mt-2" style={{ backgroundColor: COLORS.primary }} />
                        )}
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-center justify-center text-sm" style={{ color: COLORS.primary }}>
                  View All Notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 hover:bg-gray-100">
                  <Avatar className="h-8 w-8 border-2 border-gray-200">
                    <AvatarImage src="" alt="Admin" />
                    <AvatarFallback className="text-white text-sm font-medium" 
                                   style={{ backgroundColor: COLORS.primary }}>
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left hidden lg:block">
                    <p className="text-sm font-medium text-gray-900">Admin User</p>
                    <p className="text-xs text-gray-500">admin@rainco.lk</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white">
                <DropdownMenuLabel className="text-gray-900">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Admin User</p>
                    <p className="text-xs text-gray-500">admin@rainco.lk</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                  <User className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-700">Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                  <Settings className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-700">Preferences</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={onLogout} 
                  className="flex items-center gap-2 cursor-pointer"
                  style={{ color: COLORS.primary }}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isMobileMenuOpen && (
          <div className="lg:hidden px-4 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search customers, orders, tickets..."
                className="pl-10 border-gray-300"
              />
            </div>
          </div>
        )}
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className={`
          w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] sticky top-[73px]
          transform transition-transform duration-200 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static
          fixed lg:relative z-40 h-[calc(100vh-73px)] lg:h-auto
        `}>
          {/* Mobile Overlay */}
          {isMobileMenuOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
          
          <nav className="p-4 space-y-1 h-full overflow-y-auto">
            {/* Menu Items */}
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  style={isActive ? { backgroundColor: COLORS.primary } : {}}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-white bg-opacity-50" />
                  )}
                </button>
              );
            })}

            {/* Bottom Spacing for Mobile */}
            <div className="lg:hidden h-20" />
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-h-[calc(100vh-73px)] p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}