import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Plus, Mail, MessageSquare, Users, TrendingUp, Calendar, Target, ArrowUpRight, Clock, Edit2, Play, BarChart3, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';

// Color constants from your palette
const COLORS = {
  primary: '#d72b1b',
  dark: '#202125',
  light: '#f2f3f5',
  primaryLight: '#e74c3c',
  primaryDark: '#c0392b',
  darkLight: '#2c2e33',
};

interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'sms';
  status: 'active' | 'scheduled' | 'completed' | 'draft';
  audience: string;
  sent: number;
  total: number;
  openRate: number;
  clickRate: number;
  scheduledDate: string;
  createdAt: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Monsoon Season Sale - 25% Off',
    type: 'email',
    status: 'active',
    audience: 'All Customers',
    sent: 2847,
    total: 2847,
    openRate: 42.5,
    clickRate: 18.3,
    scheduledDate: '2024-10-25',
    createdAt: '2024-10-20'
  },
  {
    id: '2',
    name: 'New Mosquito Net Collection Launch',
    type: 'email',
    status: 'completed',
    audience: 'Previous Buyers',
    sent: 1523,
    total: 1523,
    openRate: 38.2,
    clickRate: 15.7,
    scheduledDate: '2024-10-20',
    createdAt: '2024-10-15'
  },
  {
    id: '3',
    name: 'Exclusive Gold Member Discount',
    type: 'sms',
    status: 'completed',
    audience: 'Gold Members',
    sent: 428,
    total: 428,
    openRate: 95.2,
    clickRate: 32.1,
    scheduledDate: '2024-10-18',
    createdAt: '2024-10-12'
  },
  {
    id: '4',
    name: 'Raincoat Bundle Offer',
    type: 'email',
    status: 'scheduled',
    audience: 'New Customers',
    sent: 0,
    total: 324,
    openRate: 0,
    clickRate: 0,
    scheduledDate: '2024-11-01',
    createdAt: '2024-10-28'
  },
  {
    id: '5',
    name: 'Cart Abandonment Reminder',
    type: 'email',
    status: 'draft',
    audience: 'Cart Abandoners',
    sent: 0,
    total: 156,
    openRate: 0,
    clickRate: 0,
    scheduledDate: '2024-11-05',
    createdAt: '2024-10-29'
  },
];

export default function MarketingCampaigns() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-300';
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'draft': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'email' ? 
      <Mail className="h-4 w-4" style={{ color: COLORS.primary }} /> : 
      <MessageSquare className="h-4 w-4" style={{ color: COLORS.primary }} />;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="h-3 w-3" />;
      case 'scheduled': return <Clock className="h-3 w-3" />;
      case 'completed': return <CheckCircle className="h-3 w-3" />;
      case 'draft': return <Edit2 className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketing Campaigns</h1>
            <p className="text-gray-600">Create and manage email & SMS campaigns for your customers</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                style={{ backgroundColor: COLORS.primary }}
                className="hover:opacity-90 transition-opacity"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl bg-white">
              <DialogHeader>
                <DialogTitle className="text-gray-900">Create New Campaign</DialogTitle>
                <DialogDescription>
                  Design and schedule your email or SMS marketing campaign
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="campaign-name" className="text-gray-700">Campaign Name</Label>
                    <Input 
                      id="campaign-name" 
                      placeholder="e.g., Summer Sale 2024" 
                      className="border-gray-300 focus:border-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="campaign-type" className="text-gray-700">Campaign Type</Label>
                    <Select defaultValue="email">
                      <SelectTrigger id="campaign-type" className="border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email Campaign</SelectItem>
                        <SelectItem value="sms">SMS Campaign</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="audience" className="text-gray-700">Target Audience</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="audience" className="border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Customers (2,847)</SelectItem>
                      <SelectItem value="new">New Customers (324)</SelectItem>
                      <SelectItem value="repeat">Repeat Buyers (1,892)</SelectItem>
                      <SelectItem value="gold">Gold Members (428)</SelectItem>
                      <SelectItem value="silver">Silver Members (956)</SelectItem>
                      <SelectItem value="inactive">Inactive Customers (531)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-gray-700">Email Subject / SMS Message</Label>
                  <Input 
                    id="subject" 
                    placeholder="Enter subject line or SMS text" 
                    className="border-gray-300 focus:border-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-700">Message Content</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Write your campaign message here..."
                    className="min-h-[150px] border-gray-300 focus:border-gray-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="schedule-date" className="text-gray-700">Schedule Date</Label>
                    <Input 
                      id="schedule-date" 
                      type="date" 
                      className="border-gray-300 focus:border-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schedule-time" className="text-gray-700">Schedule Time</Label>
                    <Input 
                      id="schedule-time" 
                      type="time" 
                      className="border-gray-300 focus:border-gray-400"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-gray-300 hover:bg-gray-50"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Save as Draft
                  </Button>
                  <Button 
                    style={{ backgroundColor: COLORS.primary }}
                    className="flex-1 hover:opacity-90 transition-opacity"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Schedule Campaign
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Campaign Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Campaigns',
              value: '12',
              description: 'Active campaigns',
              icon: Target,
              color: 'blue'
            },
            {
              title: 'Emails Sent',
              value: '8,542',
              description: 'This month',
              icon: Mail,
              color: 'green'
            },
            {
              title: 'Avg Open Rate',
              value: '41.2%',
              description: 'Industry avg: 35%',
              icon: TrendingUp,
              color: 'purple'
            },
            {
              title: 'Avg Click Rate',
              value: '18.9%',
              description: 'Industry avg: 15%',
              icon: Users,
              color: 'orange'
            },
          ].map((stat, index) => (
            <Card key={index} className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${
                    stat.color === 'blue' ? 'bg-blue-50' :
                    stat.color === 'green' ? 'bg-green-50' :
                    stat.color === 'purple' ? 'bg-purple-50' :
                    'bg-orange-50'
                  }`}>
                    <stat.icon className={`h-6 w-6 ${
                      stat.color === 'blue' ? 'text-blue-600' :
                      stat.color === 'green' ? 'text-green-600' :
                      stat.color === 'purple' ? 'text-purple-600' :
                      'text-orange-600'
                    }`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Campaign Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-white border border-gray-200 p-1 rounded-lg">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#d72b1b]"
            >
              All Campaigns
            </TabsTrigger>
            <TabsTrigger 
              value="active" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#d72b1b]"
            >
              Active
            </TabsTrigger>
            <TabsTrigger 
              value="scheduled" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#d72b1b]"
            >
              Scheduled
            </TabsTrigger>
            <TabsTrigger 
              value="completed" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#d72b1b]"
            >
              Completed
            </TabsTrigger>
            <TabsTrigger 
              value="draft" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#d72b1b]"
            >
              Drafts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockCampaigns.map((campaign) => (
                <Card 
                  key={campaign.id} 
                  className="bg-white border-gray-200 hover:shadow-lg transition-shadow duration-200"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(campaign.type)}
                        <Badge 
                          variant="outline" 
                          className={getStatusColor(campaign.status)}
                        >
                          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle className="text-lg text-gray-900 leading-tight">
                      {campaign.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <Users className="h-3 w-3" />
                      {campaign.audience} • {campaign.total.toLocaleString()} recipients
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {campaign.status !== 'draft' && campaign.status !== 'scheduled' && (
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-600">Delivery Progress</span>
                            <span className="text-gray-900 font-medium">
                              {campaign.sent.toLocaleString()} / {campaign.total.toLocaleString()}
                            </span>
                          </div>
                          <Progress 
                            value={(campaign.sent / campaign.total) * 100} 
                            className="h-2 bg-gray-200"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                            <p className="text-sm text-gray-600 mb-1">Open Rate</p>
                            <p className="text-xl font-bold text-gray-900">{campaign.openRate}%</p>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                            <p className="text-sm text-gray-600 mb-1">Click Rate</p>
                            <p className="text-xl font-bold text-gray-900">{campaign.clickRate}%</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {(campaign.status === 'scheduled' || campaign.status === 'draft') && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                          <Calendar className="h-4 w-4" />
                          <span>Scheduled for {campaign.scheduledDate}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 border-gray-300">
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            className="flex-1"
                            style={{ backgroundColor: COLORS.primary }}
                          >
                            {campaign.status === 'draft' ? 'Schedule' : 'Send Now'}
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Created {campaign.createdAt}</span>
                        <Button variant="ghost" size="sm" className="h-6 text-xs">
                          View Details
                          <ArrowUpRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Other tab contents with enhanced styling */}
          <TabsContent value="active" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockCampaigns.filter(c => c.status === 'active').map((campaign) => (
                <Card key={campaign.id} className="bg-white border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-gray-900">{campaign.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      {getTypeIcon(campaign.type)}
                      {campaign.audience}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <p className="text-2xl font-bold text-gray-900">{campaign.openRate}%</p>
                          <p className="text-xs text-gray-600">Open Rate</p>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <p className="text-2xl font-bold text-gray-900">{campaign.clickRate}%</p>
                          <p className="text-xs text-gray-600">Click Rate</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full border-gray-300"
                        style={{ color: COLORS.primary }}
                      >
                        View Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="scheduled" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockCampaigns.filter(c => c.status === 'scheduled').map((campaign) => (
                <Card key={campaign.id} className="bg-white border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-gray-900">{campaign.name}</CardTitle>
                    <CardDescription>
                      Scheduled for {campaign.scheduledDate}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        {campaign.total.toLocaleString()} recipients
                      </div>
                      <Button 
                        className="w-full"
                        style={{ backgroundColor: COLORS.primary }}
                      >
                        Send Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockCampaigns.filter(c => c.status === 'completed').map((campaign) => (
                <Card key={campaign.id} className="bg-white border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-gray-900">{campaign.name}</CardTitle>
                    <CardDescription>Completed on {campaign.scheduledDate}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <p className="text-xl font-bold text-gray-900">{campaign.openRate}%</p>
                          <p className="text-xs text-gray-600">Open Rate</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xl font-bold text-gray-900">{campaign.clickRate}%</p>
                          <p className="text-xs text-gray-600">Click Rate</p>
                        </div>
                      </div>
                      <Progress value={campaign.openRate} className="h-2 bg-gray-200" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="draft" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockCampaigns.filter(c => c.status === 'draft').map((campaign) => (
                <Card key={campaign.id} className="bg-white border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-gray-900">{campaign.name}</CardTitle>
                    <CardDescription>Draft created {campaign.createdAt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full"
                      style={{ backgroundColor: COLORS.primary }}
                    >
                      Continue Editing
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}