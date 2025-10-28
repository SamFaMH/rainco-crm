import { useState } from 'react';
import { Home, Users, MessageSquare, Megaphone, BarChart3, Settings } from 'lucide-react';
import Login from './components/Login';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './components/Dashboard';
import CustomerManagement from './components/CustomerManagement';
import SupportTickets from './components/SupportTickets';
import MarketingCampaigns from './components/MarketingCampaigns';
import Analytics from './components/Analytics';
import SettingsPage from './components/SettingsPage';

type Page = 'login' | 'dashboard' | 'customers' | 'tickets' | 'campaigns' | 'analytics' | 'settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  const menuItems = [
    { id: 'dashboard' as Page, label: 'Dashboard', icon: Home },
    { id: 'customers' as Page, label: 'Customers', icon: Users },
    { id: 'tickets' as Page, label: 'Support Tickets', icon: MessageSquare },
    { id: 'campaigns' as Page, label: 'Campaigns', icon: Megaphone },
    { id: 'analytics' as Page, label: 'Analytics', icon: BarChart3 },
    { id: 'settings' as Page, label: 'Settings', icon: Settings },
  ];

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'customers':
        return <CustomerManagement />;
      case 'tickets':
        return <SupportTickets />;
      case 'campaigns':
        return <MarketingCampaigns />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <DashboardLayout
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      menuItems={menuItems}
      onLogout={handleLogout}
    >
      {renderPage()}
    </DashboardLayout>
  );
}
