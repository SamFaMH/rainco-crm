import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Users, Shield, Database, Bell, Globe, Mail, Key, BarChart, Download, Plus, Edit, CheckCircle, AlertCircle, LogOut, Eye, EyeOff } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Alert, AlertDescription } from './ui/alert';

// Color constants from your palette
const COLORS = {
  primary: '#d72b1b',
  dark: '#202125',
  light: '#f2f3f5',
  primaryLight: '#e74c3c',
  primaryDark: '#c0392b',
  darkLight: '#2c2e33',
};

interface UserRole {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'support' | 'marketing' | 'viewer';
  status: 'active' | 'inactive';
  lastActive: string;
}

const mockUsers: UserRole[] = [
  { id: '1', name: 'Admin User', email: 'admin@rainco.lk', role: 'admin', status: 'active', lastActive: '2024-10-28' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah.j@rainco.lk', role: 'support', status: 'active', lastActive: '2024-10-28' },
  { id: '3', name: 'Mike Chen', email: 'mike.c@rainco.lk', role: 'support', status: 'active', lastActive: '2024-10-27' },
  { id: '4', name: 'Emma Davis', email: 'emma.d@rainco.lk', role: 'marketing', status: 'active', lastActive: '2024-10-28' },
  { id: '5', name: 'John Perera', email: 'john.p@rainco.lk', role: 'viewer', status: 'inactive', lastActive: '2024-10-15' },
];

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'support': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'marketing': return 'bg-green-100 text-green-800 border-green-300';
      case 'viewer': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800 border-green-300' 
      : 'bg-gray-100 text-gray-800 border-gray-300';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
            <p className="text-gray-600">Manage your CRM configuration and preferences</p>
          </div>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="bg-white border border-gray-200 p-1 rounded-lg">
            <TabsTrigger 
              value="users" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#d72b1b]"
            >
              <Users className="mr-2 h-4 w-4" />
              User Management
            </TabsTrigger>
            <TabsTrigger 
              value="integrations" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#d72b1b]"
            >
              <Database className="mr-2 h-4 w-4" />
              Integrations
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#d72b1b]"
            >
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#d72b1b]"
            >
              <Shield className="mr-2 h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6 mt-6">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-gray-900">Team Members & Roles</CardTitle>
                    <CardDescription>Manage user access and permissions for your CRM</CardDescription>
                  </div>
                  <Button 
                    style={{ backgroundColor: COLORS.primary }}
                    className="hover:opacity-90 transition-opacity"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-gray-200 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50 hover:bg-gray-50">
                        <TableHead className="text-gray-900 font-semibold">Name</TableHead>
                        <TableHead className="text-gray-900 font-semibold">Email</TableHead>
                        <TableHead className="text-gray-900 font-semibold">Role</TableHead>
                        <TableHead className="text-gray-900 font-semibold">Status</TableHead>
                        <TableHead className="text-gray-900 font-semibold">Last Active</TableHead>
                        <TableHead className="text-gray-900 font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockUsers.map((user) => (
                        <TableRow key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <TableCell className="font-medium text-gray-900">{user.name}</TableCell>
                          <TableCell className="text-gray-600">{user.email}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getRoleColor(user.role)}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusColor(user.status)}>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-600">{user.lastActive}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="h-8 text-gray-600 hover:text-gray-900">
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { role: 'Admin', count: 1, description: 'Full system access', icon: Shield, color: 'purple' },
                    { role: 'Support', count: 2, description: 'Ticket management', icon: Users, color: 'blue' },
                    { role: 'Marketing', count: 1, description: 'Campaign management', icon: Mail, color: 'green' },
                    { role: 'Viewer', count: 1, description: 'Read-only access', icon: BarChart, color: 'gray' },
                  ].map((stat, index) => (
                    <Card key={index} className="bg-white border-gray-200 hover:shadow-sm transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            stat.color === 'purple' ? 'bg-purple-50' :
                            stat.color === 'blue' ? 'bg-blue-50' :
                            stat.color === 'green' ? 'bg-green-50' :
                            'bg-gray-50'
                          }`}>
                            <stat.icon className={`h-5 w-5 ${
                              stat.color === 'purple' ? 'text-purple-600' :
                              stat.color === 'blue' ? 'text-blue-600' :
                              stat.color === 'green' ? 'text-green-600' :
                              'text-gray-600'
                            }`} />
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                            <p className="text-sm text-gray-600">{stat.role}</p>
                            <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Role Permissions</CardTitle>
                <CardDescription>Configure what each role can access</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-5 gap-4 pb-3 border-b border-gray-200">
                    <div className="text-sm font-medium text-gray-900">Permission</div>
                    <div className="text-sm text-gray-600 text-center">Admin</div>
                    <div className="text-sm text-gray-600 text-center">Support</div>
                    <div className="text-sm text-gray-600 text-center">Marketing</div>
                    <div className="text-sm text-gray-600 text-center">Viewer</div>
                  </div>

                  {[
                    { name: 'View Dashboard', admin: true, support: true, marketing: true, viewer: true },
                    { name: 'Manage Customers', admin: true, support: true, marketing: false, viewer: false },
                    { name: 'Handle Tickets', admin: true, support: true, marketing: false, viewer: false },
                    { name: 'Create Campaigns', admin: true, support: false, marketing: true, viewer: false },
                    { name: 'View Analytics', admin: true, support: true, marketing: true, viewer: true },
                    { name: 'Manage Settings', admin: true, support: false, marketing: false, viewer: false },
                  ].map((permission, index) => (
                    <div key={index} className="grid grid-cols-5 gap-4 items-center py-3 border-b border-gray-100 last:border-0">
                      <div className="text-sm text-gray-700">{permission.name}</div>
                      <div className="text-center">
                        <Switch checked={permission.admin} disabled className="data-[state=checked]:bg-purple-600" />
                      </div>
                      <div className="text-center">
                        <Switch checked={permission.support} disabled className="data-[state=checked]:bg-blue-600" />
                      </div>
                      <div className="text-center">
                        <Switch checked={permission.marketing} disabled className="data-[state=checked]:bg-green-600" />
                      </div>
                      <div className="text-center">
                        <Switch checked={permission.viewer} disabled className="data-[state=checked]:bg-gray-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-6 mt-6">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Website Integration</CardTitle>
                <CardDescription>Connect your e-commerce site shop.rainco.lk</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="bg-green-50 border-green-200 border-l-4 border-l-green-400">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Connected to shop.rainco.lk
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="api-key" className="text-gray-700">API Key</Label>
                    <div className="flex gap-2 mt-2">
                      <div className="relative flex-1">
                        <Input 
                          id="api-key" 
                          type={showApiKey ? "text" : "password"} 
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          className="pr-10 border-gray-300"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowApiKey(!showApiKey)}
                        >
                          {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <Button variant="outline" className="border-gray-300">Regenerate</Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Keep this key secure. It provides full access to your CRM data.</p>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-700">Webhook URL</Label>
                      <Input 
                        className="mt-2 border-gray-300"
                        value="https://api.rainco.lk/webhooks/crm" 
                        readOnly
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700">Last Sync</Label>
                      <Input 
                        className="mt-2 border-gray-300"
                        value="2024-10-28 14:35:00" 
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div>
                      <p className="text-sm text-gray-900 font-medium">Auto-sync customer data</p>
                      <p className="text-xs text-gray-500">Automatically sync new orders and customers</p>
                    </div>
                    <Switch checked={true} className="data-[state=checked]:bg-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Power BI Integration</CardTitle>
                <CardDescription>Connect to Microsoft Power BI for advanced analytics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="bg-blue-50 border-blue-200 border-l-4 border-l-blue-400">
                  <BarChart className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    Power BI integration available
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="powerbi-workspace" className="text-gray-700">Power BI Workspace ID</Label>
                    <Input 
                      id="powerbi-workspace" 
                      placeholder="Enter your workspace ID"
                      className="mt-2 border-gray-300"
                    />
                  </div>

                  <div>
                    <Label htmlFor="powerbi-dataset" className="text-gray-700">Dataset Name</Label>
                    <Input 
                      id="powerbi-dataset" 
                      placeholder="rainco-crm-data"
                      className="mt-2 border-gray-300"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      style={{ backgroundColor: COLORS.primary }}
                      className="hover:opacity-90 transition-opacity"
                    >
                      Connect Power BI
                    </Button>
                    <Button variant="outline" className="border-gray-300">
                      View Documentation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Other Integrations</CardTitle>
                <CardDescription>Available third-party integrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Google Analytics', status: 'connected', icon: Globe, color: 'green' },
                    { name: 'Mailchimp', status: 'available', icon: Mail, color: 'blue' },
                    { name: 'Slack Notifications', status: 'available', icon: Bell, color: 'purple' },
                    { name: 'Zapier', status: 'available', icon: Database, color: 'orange' },
                  ].map((integration, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          integration.color === 'green' ? 'bg-green-50' :
                          integration.color === 'blue' ? 'bg-blue-50' :
                          integration.color === 'purple' ? 'bg-purple-50' :
                          'bg-orange-50'
                        }`}>
                          <integration.icon className={`h-4 w-4 ${
                            integration.color === 'green' ? 'text-green-600' :
                            integration.color === 'blue' ? 'text-blue-600' :
                            integration.color === 'purple' ? 'text-purple-600' :
                            'text-orange-600'
                          }`} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-900 font-medium">{integration.name}</p>
                          <p className="text-xs text-gray-500">
                            {integration.status === 'connected' ? 'Connected and active' : 'Click to configure'}
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant={integration.status === 'connected' ? 'outline' : 'default'}
                        className={
                          integration.status === 'connected' 
                            ? 'border-gray-300' 
                            : ''
                        }
                        style={integration.status !== 'connected' ? { backgroundColor: COLORS.primary } : {}}
                      >
                        {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6 mt-6">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to be notified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { 
                    title: 'Email Notifications', 
                    description: 'Receive updates via email',
                    checked: emailNotifications,
                    onChange: setEmailNotifications
                  },
                  { 
                    title: 'Push Notifications', 
                    description: 'Browser push notifications',
                    checked: pushNotifications,
                    onChange: setPushNotifications
                  },
                  { 
                    title: 'Marketing Emails', 
                    description: 'Product updates and newsletters',
                    checked: marketingEmails,
                    onChange: setMarketingEmails
                  },
                ].map((setting, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="text-sm text-gray-900 font-medium">{setting.title}</p>
                      <p className="text-xs text-gray-500">{setting.description}</p>
                    </div>
                    <Switch 
                      checked={setting.checked} 
                      onCheckedChange={setting.onChange}
                      className="data-[state=checked]:bg-green-600"
                    />
                  </div>
                ))}

                <Separator />

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-900">Notify me about:</h4>
                  
                  {[
                    'New customer registrations',
                    'High priority support tickets',
                    'Campaign performance milestones',
                    'Weekly analytics reports',
                    'System updates and maintenance',
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <p className="text-sm text-gray-700">{item}</p>
                      <Switch defaultChecked className="data-[state=checked]:bg-green-600" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6 mt-6">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-900">Change Password</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="current-password" className="text-gray-700">Current Password</Label>
                      <Input 
                        id="current-password" 
                        type="password" 
                        placeholder="••••••••"
                        className="mt-2 border-gray-300"
                      />
                    </div>

                    <div>
                      <Label htmlFor="new-password" className="text-gray-700">New Password</Label>
                      <Input 
                        id="new-password" 
                        type="password" 
                        placeholder="••••••••"
                        className="mt-2 border-gray-300"
                      />
                    </div>

                    <div>
                      <Label htmlFor="confirm-password" className="text-gray-700">Confirm New Password</Label>
                      <Input 
                        id="confirm-password" 
                        type="password" 
                        placeholder="••••••••"
                        className="mt-2 border-gray-300"
                      />
                    </div>

                    <Button 
                      style={{ backgroundColor: COLORS.primary }}
                      className="hover:opacity-90 transition-opacity"
                    >
                      Update Password
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="text-sm text-gray-900 font-medium">Enable 2FA</p>
                      <p className="text-xs text-gray-500">Add an extra layer of security</p>
                    </div>
                    <Switch className="data-[state=checked]:bg-green-600" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-900">Active Sessions</h4>
                  <div className="space-y-3">
                    {[
                      { device: 'Chrome on Windows', location: 'Colombo, Sri Lanka', active: true, time: 'Current session' },
                      { device: 'Safari on iPhone', location: 'Colombo, Sri Lanka', active: false, time: '2 hours ago' },
                    ].map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div>
                          <p className="text-sm text-gray-900 font-medium">{session.device}</p>
                          <p className="text-xs text-gray-500">{session.location} • {session.time}</p>
                        </div>
                        {!session.active && (
                          <Button variant="outline" size="sm" className="border-gray-300">
                            <LogOut className="h-3 w-3 mr-1" />
                            Revoke
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Data & Privacy</CardTitle>
                <CardDescription>Manage your data and privacy settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="text-sm text-gray-900 font-medium">Export Customer Data</p>
                    <p className="text-xs text-gray-500">Download all customer information</p>
                  </div>
                  <Button variant="outline" className="border-gray-300">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="text-sm text-gray-900 font-medium">Data Retention Period</p>
                    <p className="text-xs text-gray-500">How long to keep customer data</p>
                  </div>
                  <Select defaultValue="2years">
                    <SelectTrigger className="w-[180px] border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1year">1 Year</SelectItem>
                      <SelectItem value="2years">2 Years</SelectItem>
                      <SelectItem value="3years">3 Years</SelectItem>
                      <SelectItem value="forever">Forever</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}