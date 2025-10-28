import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Users, UserPlus, Repeat, MessageSquare, TrendingUp, TrendingDown, ArrowUpRight, ShoppingBag, Package, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
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

const monthlySalesData = [
  { month: 'Jan', sales: 45000, target: 50000 },
  { month: 'Feb', sales: 52000, target: 55000 },
  { month: 'Mar', sales: 48000, target: 52000 },
  { month: 'Apr', sales: 61000, target: 60000 },
  { month: 'May', sales: 55000, target: 58000 },
  { month: 'Jun', sales: 67000, target: 65000 },
  { month: 'Jul', sales: 72000, target: 70000 },
  { month: 'Aug', sales: 68000, target: 72000 },
  { month: 'Sep', sales: 75000, target: 75000 },
  { month: 'Oct', sales: 82000, target: 78000 },
];

const productCategoryData = [
  { name: 'Umbrellas', value: 45, color: COLORS.primary },
  { name: 'Raincoats', value: 30, color: '#e74c3c' },
  { name: 'Mosquito Nets', value: 25, color: '#f39c12' },
];

const recentOrders = [
  { customer: 'Amara Silva', product: 'Premium Umbrella', amount: 'LKR 3,500', status: 'completed', time: '2 min ago' },
  { customer: 'Kasun Perera', product: 'Raincoat - Large', amount: 'LKR 5,200', status: 'processing', time: '15 min ago' },
  { customer: 'Dilini Fernando', product: 'Mosquito Net Set', amount: 'LKR 4,800', status: 'completed', time: '1 hour ago' },
  { customer: 'Nuwan Jayasinghe', product: 'Golf Umbrella', amount: 'LKR 6,500', status: 'pending', time: '2 hours ago' },
];

const notifications = [
  { type: 'alert', message: 'Stock running low for Premium Umbrellas', time: '2 hours ago', icon: AlertCircle },
  { type: 'info', message: '5 new customer reviews pending', time: '3 hours ago', icon: Info },
  { type: 'success', message: 'Monthly sales target achieved!', time: '1 day ago', icon: CheckCircle },
];

// Custom tooltip component
const CustomTooltip = ({ active, payload, label, currency = false }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="text-gray-900 font-semibold mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {currency ? `LKR ${entry.value.toLocaleString()}` : entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your online store today.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Last updated: Today, 10:30 AM</span>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              title: 'Total Customers', 
              value: '2,847', 
              change: '+12.5%', 
              positive: true, 
              icon: Users,
              description: 'From last month',
              color: 'blue'
            },
            { 
              title: 'New This Month', 
              value: '324', 
              change: '+8.2%', 
              positive: true, 
              icon: UserPlus,
              description: 'From last month',
              color: 'green'
            },
            { 
              title: 'Repeat Purchase Rate', 
              value: '68.4%', 
              change: '-2.1%', 
              positive: false, 
              icon: Repeat,
              description: 'From last month',
              color: 'purple'
            },
            { 
              title: 'Pending Tickets', 
              value: '23', 
              change: '8 urgent', 
              positive: null, 
              icon: MessageSquare,
              description: '15 normal priority',
              color: 'yellow'
            },
          ].map((metric, index) => (
            <Card key={index} className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${
                    metric.color === 'blue' ? 'bg-blue-50' :
                    metric.color === 'green' ? 'bg-green-50' :
                    metric.color === 'purple' ? 'bg-purple-50' :
                    'bg-yellow-50'
                  }`}>
                    <metric.icon className={`h-6 w-6 ${
                      metric.color === 'blue' ? 'text-blue-600' :
                      metric.color === 'green' ? 'text-green-600' :
                      metric.color === 'purple' ? 'text-purple-600' :
                      'text-yellow-600'
                    }`} />
                  </div>
                  {metric.positive !== null && (
                    <div className={`flex items-center gap-1 text-sm font-medium ${
                      metric.positive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.positive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      <span>{metric.change}</span>
                    </div>
                  )}
                  {metric.positive === null && (
                    <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300 text-xs">
                      {metric.change}
                    </Badge>
                  )}
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
                <p className="text-xs text-gray-500">{metric.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-white border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-gray-900">Monthly Sales Trend</CardTitle>
              <CardDescription>Sales performance over the last 10 months (LKR)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlySalesData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip content={<CustomTooltip currency />} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="sales" 
                    stroke={COLORS.primary} 
                    fillOpacity={1} 
                    fill="url(#colorSales)"
                    strokeWidth={2}
                    name="Sales"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#64748b" 
                    strokeDasharray="5 5"
                    strokeWidth={2}
                    name="Target"
                    dot={{ fill: '#64748b', r: 3 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-gray-900">Top Product Categories</CardTitle>
              <CardDescription>Sales distribution by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={productCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${value}%`}
                    outerRadius={80}
                    innerRadius={40}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {productCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-6 space-y-3">
                {productCategoryData.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-gray-700">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            backgroundColor: item.color,
                            width: `${item.value}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-white border-gray-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-gray-900">Recent Orders</CardTitle>
                  <CardDescription>Latest customer orders from shop.rainco.lk</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                  View All
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <ShoppingBag className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-gray-900 font-medium">{order.customer}</p>
                        <p className="text-sm text-gray-600">{order.product}</p>
                        <p className="text-xs text-gray-500 mt-1">{order.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-900 font-semibold">{order.amount}</p>
                      <Badge
                        className={
                          order.status === 'completed' ? 'bg-green-100 text-green-800 border-green-300' :
                          order.status === 'processing' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                          'bg-yellow-100 text-yellow-800 border-yellow-300'
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-gray-900">Notifications & Alerts</CardTitle>
              <CardDescription>Important updates for your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification, index) => (
                  <Alert 
                    key={index}
                    className={`border-l-4 ${
                      notification.type === 'alert' ? 'border-red-400 bg-red-50' :
                      notification.type === 'success' ? 'border-green-400 bg-green-50' :
                      'border-blue-400 bg-blue-50'
                    } hover:shadow-sm transition-shadow cursor-pointer`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-1 rounded-full ${
                        notification.type === 'alert' ? 'bg-red-100' :
                        notification.type === 'success' ? 'bg-green-100' :
                        'bg-blue-100'
                      }`}>
                        <notification.icon className={`h-4 w-4 ${
                          notification.type === 'alert' ? 'text-red-600' :
                          notification.type === 'success' ? 'text-green-600' :
                          'text-blue-600'
                        }`} />
                      </div>
                      <AlertDescription className="flex-1">
                        <p className="text-sm text-gray-900 mb-1">{notification.message}</p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </AlertDescription>
                    </div>
                  </Alert>
                ))}
                
                {/* Quick Stats */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Stats</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Today's Revenue</span>
                      <span className="text-gray-900 font-semibold">LKR 24,500</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Orders Today</span>
                      <span className="text-gray-900 font-semibold">18</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Conversion Rate</span>
                      <span className="text-gray-900 font-semibold">3.2%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}