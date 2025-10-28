import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Search, Filter, Download, X, Phone, Mail, MapPin, ShoppingBag, MessageSquare, Award, User, Calendar } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';

// Color constants from your palette
const COLORS = {
  primary: '#d72b1b',
  dark: '#202125',
  light: '#f2f3f5',
  primaryLight: '#e74c3c',
  primaryDark: '#c0392b',
  darkLight: '#2c2e33',
};

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  lastOrderDate: string;
  totalPurchases: number;
  loyaltyStatus: 'Gold' | 'Silver' | 'Bronze' | 'New';
  loyaltyPoints: number;
}

const mockCustomers: Customer[] = [
  { id: '1', name: 'Amara Silva', email: 'amara.silva@email.lk', phone: '+94 77 123 4567', city: 'Colombo', lastOrderDate: '2024-10-25', totalPurchases: 45600, loyaltyStatus: 'Gold', loyaltyPoints: 456 },
  { id: '2', name: 'Kasun Perera', email: 'kasun.p@email.lk', phone: '+94 71 234 5678', city: 'Kandy', lastOrderDate: '2024-10-20', totalPurchases: 32400, loyaltyStatus: 'Silver', loyaltyPoints: 324 },
  { id: '3', name: 'Dilini Fernando', email: 'dilini.f@email.lk', phone: '+94 76 345 6789', city: 'Galle', lastOrderDate: '2024-10-28', totalPurchases: 28900, loyaltyStatus: 'Silver', loyaltyPoints: 289 },
  { id: '4', name: 'Nuwan Jayasinghe', email: 'nuwan.j@email.lk', phone: '+94 77 456 7890', city: 'Colombo', lastOrderDate: '2024-10-15', totalPurchases: 15200, loyaltyStatus: 'Bronze', loyaltyPoints: 152 },
  { id: '5', name: 'Thilini Wickramasinghe', email: 'thilini.w@email.lk', phone: '+94 70 567 8901', city: 'Negombo', lastOrderDate: '2024-10-27', totalPurchases: 52300, loyaltyStatus: 'Gold', loyaltyPoints: 523 },
  { id: '6', name: 'Rohan Dissanayake', email: 'rohan.d@email.lk', phone: '+94 71 678 9012', city: 'Jaffna', lastOrderDate: '2024-10-22', totalPurchases: 8700, loyaltyStatus: 'Bronze', loyaltyPoints: 87 },
  { id: '7', name: 'Sanduni Rajapaksa', email: 'sanduni.r@email.lk', phone: '+94 77 789 0123', city: 'Colombo', lastOrderDate: '2024-10-26', totalPurchases: 19500, loyaltyStatus: 'Silver', loyaltyPoints: 195 },
  { id: '8', name: 'Chamara Bandara', email: 'chamara.b@email.lk', phone: '+94 76 890 1234', city: 'Matara', lastOrderDate: '2024-10-18', totalPurchases: 12300, loyaltyStatus: 'Bronze', loyaltyPoints: 123 },
  { id: '9', name: 'Nimali Gunasekara', email: 'nimali.g@email.lk', phone: '+94 70 901 2345', city: 'Kurunegala', lastOrderDate: '2024-10-28', totalPurchases: 3200, loyaltyStatus: 'New', loyaltyPoints: 32 },
  { id: '10', name: 'Lahiru Samarasinghe', email: 'lahiru.s@email.lk', phone: '+94 77 012 3456', city: 'Colombo', lastOrderDate: '2024-10-24', totalPurchases: 38700, loyaltyStatus: 'Gold', loyaltyPoints: 387 },
];

const purchaseHistory = [
  { date: '2024-10-25', orderId: '#ORD-1234', items: 'Premium Umbrella x2', amount: 7000, status: 'Delivered' },
  { date: '2024-09-15', orderId: '#ORD-1198', items: 'Raincoat - Large', amount: 5200, status: 'Delivered' },
  { date: '2024-08-10', orderId: '#ORD-1156', items: 'Mosquito Net Set', amount: 4800, status: 'Delivered' },
  { date: '2024-07-05', orderId: '#ORD-1089', items: 'Golf Umbrella, Raincoat', amount: 11500, status: 'Delivered' },
];

const customerTickets = [
  { id: 'TKT-001', subject: 'Product quality inquiry', status: 'Resolved', date: '2024-10-20' },
  { id: 'TKT-002', subject: 'Delivery delay issue', status: 'Resolved', date: '2024-09-10' },
];

export default function CustomerManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [loyaltyFilter, setLoyaltyFilter] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [agentNotes, setAgentNotes] = useState('Customer prefers morning deliveries. Very responsive to promotional emails.');

  const filteredCustomers = mockCustomers.filter((customer) => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = cityFilter === 'all' || customer.city === cityFilter;
    const matchesLoyalty = loyaltyFilter === 'all' || customer.loyaltyStatus === loyaltyFilter;
    
    return matchesSearch && matchesCity && matchesLoyalty;
  });

  const getLoyaltyColor = (status: string) => {
    switch (status) {
      case 'Gold': 
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Silver': 
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'Bronze': 
        return 'bg-orange-100 text-orange-800 border-orange-300';
      default: 
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  const getLoyaltyIconColor = (status: string) => {
    switch (status) {
      case 'Gold': return 'text-yellow-600';
      case 'Silver': return 'text-gray-600';
      case 'Bronze': return 'text-orange-600';
      default: return 'text-blue-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Management</h1>
            <p className="text-gray-600">Manage and track all your online customers from shop.rainco.lk</p>
          </div>
          <Button 
            style={{ backgroundColor: COLORS.primary }}
            className="hover:opacity-90 transition-opacity"
          >
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>

        {/* Filters and Search Card */}
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex-1 w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-gray-400"
                  />
                </div>
              </div>
              
              <div className="flex gap-2 w-full md:w-auto">
                <Select value={cityFilter} onValueChange={setCityFilter}>
                  <SelectTrigger className="w-full md:w-[140px] bg-white border-gray-300">
                    <Filter className="h-4 w-4 mr-2 text-gray-500" />
                    <SelectValue placeholder="City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    <SelectItem value="Colombo">Colombo</SelectItem>
                    <SelectItem value="Kandy">Kandy</SelectItem>
                    <SelectItem value="Galle">Galle</SelectItem>
                    <SelectItem value="Negombo">Negombo</SelectItem>
                    <SelectItem value="Jaffna">Jaffna</SelectItem>
                    <SelectItem value="Matara">Matara</SelectItem>
                    <SelectItem value="Kurunegala">Kurunegala</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={loyaltyFilter} onValueChange={setLoyaltyFilter}>
                  <SelectTrigger className="w-full md:w-[140px] bg-white border-gray-300">
                    <Award className="h-4 w-4 mr-2 text-gray-500" />
                    <SelectValue placeholder="Loyalty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Gold">Gold</SelectItem>
                    <SelectItem value="Silver">Silver</SelectItem>
                    <SelectItem value="Bronze">Bronze</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="text-gray-900 font-semibold">Customer Name</TableHead>
                    <TableHead className="text-gray-900 font-semibold">Email</TableHead>
                    <TableHead className="text-gray-900 font-semibold">Phone</TableHead>
                    <TableHead className="text-gray-900 font-semibold">City</TableHead>
                    <TableHead className="text-gray-900 font-semibold">Last Order</TableHead>
                    <TableHead className="text-gray-900 font-semibold">Total Purchases</TableHead>
                    <TableHead className="text-gray-900 font-semibold">Loyalty Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow
                      key={customer.id}
                      className="cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100"
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      <TableCell className="font-medium text-gray-900">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-gray-600" />
                          </div>
                          {customer.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">{customer.email}</TableCell>
                      <TableCell className="text-gray-600">{customer.phone}</TableCell>
                      <TableCell className="text-gray-600">{customer.city}</TableCell>
                      <TableCell className="text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-gray-400" />
                          {customer.lastOrderDate}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold text-gray-900">
                        LKR {customer.totalPurchases.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`${getLoyaltyColor(customer.loyaltyStatus)} font-medium`}
                        >
                          <Award className={`h-3 w-3 mr-1 ${getLoyaltyIconColor(customer.loyaltyStatus)}`} />
                          {customer.loyaltyStatus}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredCustomers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <User className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No customers found matching your criteria</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Customer Profile Sheet */}
        <Sheet open={!!selectedCustomer} onOpenChange={(open) => !open && setSelectedCustomer(null)}>
          <SheetContent className="sm:max-w-2xl overflow-y-auto bg-white">
            {selectedCustomer && (
              <>
                <SheetHeader className="border-b border-gray-200 pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <SheetTitle className="text-2xl text-gray-900">{selectedCustomer.name}</SheetTitle>
                        <Badge 
                          variant="outline" 
                          className={`${getLoyaltyColor(selectedCustomer.loyaltyStatus)} mt-1 font-medium`}
                        >
                          <Award className={`h-3 w-3 mr-1 ${getLoyaltyIconColor(selectedCustomer.loyaltyStatus)}`} />
                          {selectedCustomer.loyaltyStatus} Member
                        </Badge>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setSelectedCustomer(null)}
                      className="hover:bg-gray-100"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                  {/* Contact Information */}
                  <Card className="bg-gray-50 border-gray-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-gray-900">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                        <Mail className="h-5 w-5" style={{ color: COLORS.primary }} />
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="text-gray-900">{selectedCustomer.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                        <Phone className="h-5 w-5" style={{ color: COLORS.primary }} />
                        <div>
                          <p className="text-sm text-gray-600">Phone</p>
                          <p className="text-gray-900">{selectedCustomer.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                        <MapPin className="h-5 w-5" style={{ color: COLORS.primary }} />
                        <div>
                          <p className="text-sm text-gray-600">Location</p>
                          <p className="text-gray-900">{selectedCustomer.city}, Sri Lanka</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            <ShoppingBag className="h-6 w-6" style={{ color: COLORS.primary }} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Total Purchases</p>
                            <p className="text-xl font-bold text-gray-900">
                              LKR {selectedCustomer.totalPurchases.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-yellow-50 rounded-lg">
                            <Award className="h-6 w-6 text-yellow-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Loyalty Points</p>
                            <p className="text-xl font-bold text-gray-900">
                              {selectedCustomer.loyaltyPoints} pts
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Tabs for detailed info */}
                  <Tabs defaultValue="purchases" className="w-full">
                    <TabsList className="bg-gray-100 border border-gray-200 p-1 rounded-lg w-full grid grid-cols-3">
                      <TabsTrigger 
                        value="purchases" 
                        className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#d72b1b]"
                      >
                        Purchase History
                      </TabsTrigger>
                      <TabsTrigger 
                        value="tickets" 
                        className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#d72b1b]"
                      >
                        Support Tickets
                      </TabsTrigger>
                      <TabsTrigger 
                        value="notes" 
                        className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#d72b1b]"
                      >
                        Agent Notes
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="purchases" className="space-y-4 mt-4">
                      {purchaseHistory.map((purchase, index) => (
                        <Card key={index} className="bg-white border-gray-200 hover:shadow-sm transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <p className="text-gray-900 font-semibold">{purchase.orderId}</p>
                                <p className="text-sm text-gray-600">
                                  <Calendar className="h-3 w-3 inline mr-1" />
                                  {purchase.date}
                                </p>
                              </div>
                              <Badge className="bg-green-100 text-green-800 border-green-300">
                                {purchase.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">{purchase.items}</p>
                            <p className="text-lg font-bold text-gray-900">
                              LKR {purchase.amount.toLocaleString()}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>

                    <TabsContent value="tickets" className="space-y-4 mt-4">
                      {customerTickets.map((ticket) => (
                        <Card key={ticket.id} className="bg-white border-gray-200 hover:shadow-sm transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <p className="text-gray-900 font-semibold">{ticket.id}</p>
                                <p className="text-sm text-gray-700">{ticket.subject}</p>
                              </div>
                              <Badge className="bg-green-100 text-green-800 border-green-300">
                                {ticket.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">
                              <Calendar className="h-3 w-3 inline mr-1" />
                              {ticket.date}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>

                    <TabsContent value="notes" className="mt-4">
                      <Card className="bg-white border-gray-200">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg text-gray-900">Customer Notes</CardTitle>
                          <CardDescription>Internal notes and observations about this customer</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Textarea
                            value={agentNotes}
                            onChange={(e) => setAgentNotes(e.target.value)}
                            placeholder="Add notes about this customer..."
                            className="min-h-[200px] border-gray-300 focus:border-gray-400"
                          />
                          <Button 
                            style={{ backgroundColor: COLORS.primary }}
                            className="mt-4 hover:opacity-90 transition-opacity"
                          >
                            Save Notes
                          </Button>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}