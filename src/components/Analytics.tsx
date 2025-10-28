import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Download, TrendingUp, TrendingDown, Users, ShoppingCart, Star, MapPin, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

// Color constants from your palette
const COLORS = {
  primary: '#d72b1b',
  dark: '#202125',
  light: '#f2f3f5',
  primaryLight: '#e74c3c',
  primaryDark: '#c0392b',
  darkLight: '#2c2e33',
};

const customerGrowthData = [
  { month: 'Jan', customers: 1250, newCustomers: 180 },
  { month: 'Feb', customers: 1420, newCustomers: 170 },
  { month: 'Mar', customers: 1580, newCustomers: 160 },
  { month: 'Apr', customers: 1760, newCustomers: 180 },
  { month: 'May', customers: 1950, newCustomers: 190 },
  { month: 'Jun', customers: 2140, newCustomers: 190 },
  { month: 'Jul', customers: 2320, newCustomers: 180 },
  { month: 'Aug', customers: 2490, newCustomers: 170 },
  { month: 'Sep', customers: 2670, newCustomers: 180 },
  { month: 'Oct', customers: 2847, newCustomers: 177 },
];

const salesByRegionData = [
  { region: 'Colombo', sales: 145000, customers: 985 },
  { region: 'Kandy', sales: 82000, customers: 542 },
  { region: 'Galle', sales: 68000, customers: 428 },
  { region: 'Jaffna', sales: 45000, customers: 312 },
  { region: 'Negombo', sales: 38000, customers: 256 },
  { region: 'Matara', sales: 32000, customers: 198 },
  { region: 'Kurunegala', sales: 28000, customers: 126 },
];

const satisfactionData = [
  { rating: '5 Stars', count: 1245, percentage: 58, color: COLORS.primary },
  { rating: '4 Stars', count: 623, percentage: 29, color: '#e74c3c' },
  { rating: '3 Stars', count: 172, percentage: 8, color: '#f39c12' },
  { rating: '2 Stars', count: 64, percentage: 3, color: '#f1c40f' },
  { rating: '1 Star', count: 43, percentage: 2, color: '#e67e22' },
];

const productPerformanceData = [
  { product: 'Premium Umbrellas', revenue: 285000, units: 1425 },
  { product: 'Raincoats', revenue: 198000, units: 825 },
  { product: 'Mosquito Nets', revenue: 156000, units: 980 },
  { product: 'Golf Umbrellas', revenue: 142000, units: 485 },
];

const revenueData = [
  { month: 'Jan', revenue: 45000, target: 50000 },
  { month: 'Feb', revenue: 52000, target: 55000 },
  { month: 'Mar', revenue: 48000, target: 52000 },
  { month: 'Apr', revenue: 61000, target: 60000 },
  { month: 'May', revenue: 55000, target: 58000 },
  { month: 'Jun', revenue: 67000, target: 65000 },
  { month: 'Jul', revenue: 72000, target: 70000 },
  { month: 'Aug', revenue: 68000, target: 72000 },
  { month: 'Sep', revenue: 75000, target: 75000 },
  { month: 'Oct', revenue: 82000, target: 78000 },
];

// Custom tooltip component for consistent styling
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

export default function Analytics() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Reports</h1>
            <p className="text-gray-600">Comprehensive insights into your online store performance</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Select defaultValue="30days">
              <SelectTrigger className="w-full lg:w-[180px] bg-white border-gray-300">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 sm:flex-none">
                <Download className="mr-2 h-4 w-4" />
                PDF
              </Button>
              <Button className="flex-1 sm:flex-none" style={{ backgroundColor: COLORS.primary }}>
                <Download className="mr-2 h-4 w-4" />
                Excel
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              title: 'Total Customers', 
              value: '2,847', 
              change: '+12.5%', 
              positive: true, 
              icon: Users,
              iconBg: 'bg-blue-50',
              iconColor: 'text-blue-600'
            },
            { 
              title: 'This Month Revenue', 
              value: 'LKR 82,000', 
              change: '+8.3%', 
              positive: true, 
              icon: ShoppingCart,
              iconBg: 'bg-green-50',
              iconColor: 'text-green-600'
            },
            { 
              title: 'Avg Satisfaction', 
              value: '4.6 / 5.0', 
              change: '+2.1%', 
              positive: true, 
              icon: Star,
              iconBg: 'bg-yellow-50',
              iconColor: 'text-yellow-600'
            },
            { 
              title: 'Repeat Rate', 
              value: '68.4%', 
              change: '-1.8%', 
              positive: false, 
              icon: TrendingUp,
              iconBg: 'bg-purple-50',
              iconColor: 'text-purple-600'
            },
          ].map((metric, index) => (
            <Card key={index} className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${metric.iconBg}`}>
                    <metric.icon className={`h-6 w-6 ${metric.iconColor}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    metric.positive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.positive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    <span>{metric.change}</span>
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                <p className="text-sm text-gray-600">{metric.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Analytics Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-white border border-gray-200 p-1 rounded-lg">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#d72b1b]"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="customers" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#d72b1b]"
            >
              Customers
            </TabsTrigger>
            <TabsTrigger 
              value="sales" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#d72b1b]"
            >
              Sales
            </TabsTrigger>
            <TabsTrigger 
              value="satisfaction" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#d72b1b]"
            >
              Satisfaction
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-gray-900">Revenue vs Target</CardTitle>
                  <CardDescription>Monthly revenue performance against targets (LKR)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
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
                        dataKey="revenue" 
                        stroke={COLORS.primary} 
                        fillOpacity={1} 
                        fill="url(#colorRevenue)"
                        name="Revenue"
                        strokeWidth={2}
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
                  <CardTitle className="text-gray-900">Product Performance</CardTitle>
                  <CardDescription>Revenue by product category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={productPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="product" stroke="#666" fontSize={12} angle={-15} textAnchor="end" height={60} />
                      <YAxis stroke="#666" fontSize={12} />
                      <Tooltip content={<CustomTooltip currency />} />
                      <Legend />
                      <Bar dataKey="revenue" name="Revenue (LKR)" radius={[4, 4, 0, 0]} fill={COLORS.primary} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-white border-gray-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-gray-900">Customer Growth Trend</CardTitle>
                  <CardDescription>Total and new customers over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={customerGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" stroke="#666" fontSize={12} />
                      <YAxis stroke="#666" fontSize={12} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="customers" 
                        stroke={COLORS.primary} 
                        strokeWidth={3}
                        dot={{ fill: COLORS.primary, r: 4 }}
                        name="Total Customers"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="newCustomers" 
                        stroke={COLORS.primaryLight} 
                        strokeWidth={2}
                        dot={{ fill: COLORS.primaryLight, r: 3 }}
                        name="New Customers"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-gray-900">Customer Insights</CardTitle>
                  <CardDescription>Key metrics this month</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: 'New Customers', value: '324', change: '+8.2%', positive: true, bg: 'bg-blue-50' },
                    { label: 'Active Customers', value: '1,892', change: '+5.4%', positive: true, bg: 'bg-green-50' },
                    { label: 'Churn Rate', value: '3.2%', change: '+0.5%', positive: false, bg: 'bg-yellow-50' },
                    { label: 'Avg Lifetime Value', value: 'LKR 28,400', change: '+12.1%', positive: true, bg: 'bg-purple-50' },
                  ].map((insight, index) => (
                    <div key={index} className={`p-4 rounded-lg ${insight.bg} border border-transparent hover:border-gray-200 transition-colors`}>
                      <p className="text-sm text-gray-600 mb-1">{insight.label}</p>
                      <p className="text-xl font-semibold text-gray-900">{insight.value}</p>
                      <p className={`text-xs font-medium mt-1 ${
                        insight.positive ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {insight.change} vs last month
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sales" className="space-y-6 mt-6">
            <Card className="bg-white border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-gray-900">Sales by Region</CardTitle>
                <CardDescription>Performance across Sri Lankan cities</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={salesByRegionData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="number" stroke="#666" fontSize={12} />
                    <YAxis dataKey="region" type="category" stroke="#666" fontSize={12} width={80} />
                    <Tooltip content={<CustomTooltip currency />} />
                    <Legend />
                    <Bar dataKey="sales" fill={COLORS.primary} radius={[0, 4, 4, 0]} name="Sales (LKR)" />
                  </BarChart>
                </ResponsiveContainer>

                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {salesByRegionData.slice(0, 4).map((region, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg bg-white hover:shadow-sm transition-shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4" style={{ color: COLORS.primary }} />
                        <p className="text-sm font-medium text-gray-900">{region.region}</p>
                      </div>
                      <p className="text-lg font-bold text-gray-900">LKR {region.sales.toLocaleString()}</p>
                      <p className="text-xs text-gray-600">{region.customers} customers</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="satisfaction" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-gray-900">Customer Satisfaction Ratings</CardTitle>
                  <CardDescription>Distribution of customer reviews and ratings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-8">
                    {satisfactionData.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-700 font-medium">{item.rating}</span>
                          <span className="text-gray-600">{item.count} reviews ({item.percentage}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="h-3 rounded-full transition-all duration-500"
                            style={{ 
                              backgroundColor: item.color,
                              width: `${item.percentage}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg text-center border">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
                      <span className="text-4xl font-bold text-gray-900">4.6</span>
                    </div>
                    <p className="text-sm text-gray-600 font-medium">Overall Rating</p>
                    <p className="text-xs text-gray-500 mt-1">Based on 2,147 reviews</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-gray-900">Recent Customer Feedback</CardTitle>
                  <CardDescription>Latest reviews from shop.rainco.lk</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[500px] overflow-y-auto">
                    {[
                      { name: 'Amara Silva', rating: 5, comment: 'Excellent quality umbrellas! Very durable and stylish.', date: '2024-10-27' },
                      { name: 'Kasun Perera', rating: 5, comment: 'Fast delivery and great customer service. Highly recommend!', date: '2024-10-26' },
                      { name: 'Dilini Fernando', rating: 4, comment: 'Good mosquito nets, but installation instructions could be clearer.', date: '2024-10-25' },
                      { name: 'Nuwan Jayasinghe', rating: 5, comment: 'Best raincoats in Sri Lanka! Worth every rupee.', date: '2024-10-24' },
                    ].map((review, index) => (
                      <div key={index} className="pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{review.name}</p>
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-3 w-3 ${
                                    i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                                  }`} 
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}