import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Search, Filter, Clock, User, Send, MessageSquare, Mail, AlertTriangle, CheckCircle, Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Label } from './ui/label';

// Color constants from your palette
const COLORS = {
  primary: '#d72b1b',
  dark: '#202125',
  light: '#f2f3f5',
  primaryLight: '#e74c3c',
  primaryDark: '#c0392b',
  darkLight: '#2c2e33',
};

interface Ticket {
  id: string;
  ticketNumber: string;
  customer: string;
  email: string;
  subject: string;
  status: 'open' | 'pending' | 'resolved';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  assignedTo: string;
  createdDate: string;
  lastUpdate: string;
  category: string;
}

interface Message {
  id: string;
  sender: 'customer' | 'agent';
  name: string;
  message: string;
  timestamp: string;
}

const mockTickets: Ticket[] = [
  {
    id: '1',
    ticketNumber: 'TKT-2401',
    customer: 'Amara Silva',
    email: 'amara.silva@email.lk',
    subject: 'Umbrella handle damaged on delivery',
    status: 'open',
    priority: 'urgent',
    assignedTo: 'Unassigned',
    createdDate: '2024-10-28',
    lastUpdate: '2024-10-28',
    category: 'Product Issue'
  },
  {
    id: '2',
    ticketNumber: 'TKT-2398',
    customer: 'Kasun Perera',
    email: 'kasun.p@email.lk',
    subject: 'Question about mosquito net installation',
    status: 'pending',
    priority: 'normal',
    assignedTo: 'Sarah Johnson',
    createdDate: '2024-10-27',
    lastUpdate: '2024-10-28',
    category: 'Product Support'
  },
  {
    id: '3',
    ticketNumber: 'TKT-2395',
    customer: 'Dilini Fernando',
    email: 'dilini.f@email.lk',
    subject: 'Wrong size raincoat delivered',
    status: 'pending',
    priority: 'high',
    assignedTo: 'Mike Chen',
    createdDate: '2024-10-26',
    lastUpdate: '2024-10-27',
    category: 'Order Issue'
  },
  {
    id: '4',
    ticketNumber: 'TKT-2389',
    customer: 'Nuwan Jayasinghe',
    email: 'nuwan.j@email.lk',
    subject: 'Request for bulk order discount',
    status: 'open',
    priority: 'normal',
    assignedTo: 'Unassigned',
    createdDate: '2024-10-25',
    lastUpdate: '2024-10-25',
    category: 'Sales Inquiry'
  },
  {
    id: '5',
    ticketNumber: 'TKT-2385',
    customer: 'Thilini Wickramasinghe',
    email: 'thilini.w@email.lk',
    subject: 'Refund processing time inquiry',
    status: 'resolved',
    priority: 'low',
    assignedTo: 'Sarah Johnson',
    createdDate: '2024-10-24',
    lastUpdate: '2024-10-26',
    category: 'Billing'
  },
  {
    id: '6',
    ticketNumber: 'TKT-2380',
    customer: 'Rohan Dissanayake',
    email: 'rohan.d@email.lk',
    subject: 'Delivery address change request',
    status: 'resolved',
    priority: 'high',
    assignedTo: 'Mike Chen',
    createdDate: '2024-10-23',
    lastUpdate: '2024-10-24',
    category: 'Delivery'
  },
];

const mockConversation: Message[] = [
  {
    id: '1',
    sender: 'customer',
    name: 'Amara Silva',
    message: 'Hello, I received my premium umbrella today but the handle appears to be damaged. There is a crack along the side.',
    timestamp: '2024-10-28 09:30 AM'
  },
  {
    id: '2',
    sender: 'agent',
    name: 'Support Agent',
    message: 'Hi Amara, I\'m very sorry to hear about the damaged umbrella. We take product quality seriously. Could you please share a photo of the damage? I\'ll arrange for a replacement immediately.',
    timestamp: '2024-10-28 09:45 AM'
  },
  {
    id: '3',
    sender: 'customer',
    name: 'Amara Silva',
    message: 'Thank you for the quick response. I\'ve attached photos. When can I expect the replacement?',
    timestamp: '2024-10-28 10:15 AM'
  },
];

export default function SupportTickets() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  const filteredTickets = mockTickets.filter((ticket) => {
    const matchesSearch = 
      ticket.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'normal': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return <AlertTriangle className="h-3 w-3" />;
      case 'high': return <AlertTriangle className="h-3 w-3" />;
      default: return null;
    }
  };

  const handleSendReply = () => {
    if (replyMessage.trim()) {
      // Handle sending reply
      setReplyMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Support Tickets</h1>
            <p className="text-gray-600">Manage customer support requests from shop.rainco.lk</p>
          </div>
          <Button 
            style={{ backgroundColor: COLORS.primary }}
            className="hover:opacity-90 transition-opacity"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Ticket
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              count: mockTickets.filter(t => t.status === 'open').length,
              label: 'Open Tickets',
              description: 'Requires attention',
              color: 'blue',
              icon: MessageSquare
            },
            {
              count: mockTickets.filter(t => t.status === 'pending').length,
              label: 'Pending Response',
              description: 'Waiting for customer',
              color: 'yellow',
              icon: Clock
            },
            {
              count: mockTickets.filter(t => t.status === 'resolved').length,
              label: 'Resolved Today',
              description: 'Completed tickets',
              color: 'green',
              icon: CheckCircle
            },
            {
              count: '1.2h',
              label: 'Avg Response Time',
              description: 'Industry avg: 2.5h',
              color: 'purple',
              icon: User
            },
          ].map((stat, index) => (
            <Card key={index} className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{stat.count}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${
                    stat.color === 'blue' ? 'bg-blue-50' :
                    stat.color === 'yellow' ? 'bg-yellow-50' :
                    stat.color === 'green' ? 'bg-green-50' :
                    'bg-purple-50'
                  }`}>
                    <stat.icon className={`h-6 w-6 ${
                      stat.color === 'blue' ? 'text-blue-600' :
                      stat.color === 'yellow' ? 'text-yellow-600' :
                      stat.color === 'green' ? 'text-green-600' :
                      'text-purple-600'
                    }`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ticket List */}
          <Card className="lg:col-span-1 bg-white border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-gray-900">All Tickets</CardTitle>
              <div className="space-y-3 mt-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search tickets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-gray-400"
                  />
                </div>

                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="flex-1 border-gray-300">
                      <Filter className="h-4 w-4 mr-2 text-gray-500" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="flex-1 border-gray-300">
                      <AlertTriangle className="h-4 w-4 mr-2 text-gray-500" />
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-3">
                  {filteredTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedTicket?.id === ticket.id
                          ? 'border-[#d72b1b] bg-red-50 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{ticket.ticketNumber}</p>
                          <p className="text-xs text-gray-500">{ticket.customer}</p>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={getPriorityColor(ticket.priority)}
                        >
                          {getPriorityIcon(ticket.priority)}
                          {ticket.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-2 line-clamp-2">{ticket.subject}</p>
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant="outline" 
                          className={getStatusColor(ticket.status)}
                        >
                          {ticket.status}
                        </Badge>
                        <p className="text-xs text-gray-500">{ticket.lastUpdate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Ticket Conversation */}
          <Card className="lg:col-span-2 bg-white border-gray-200">
            {selectedTicket ? (
              <>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-gray-900">{selectedTicket.ticketNumber}</CardTitle>
                      <CardDescription className="mt-2 text-gray-600">{selectedTicket.subject}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge 
                        variant="outline" 
                        className={getStatusColor(selectedTicket.status)}
                      >
                        {selectedTicket.status}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={getPriorityColor(selectedTicket.priority)}
                      >
                        {getPriorityIcon(selectedTicket.priority)}
                        {selectedTicket.priority}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Customer</p>
                        <p className="text-sm text-gray-900">{selectedTicket.customer}</p>
                        <p className="text-xs text-gray-500">{selectedTicket.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Clock className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Created</p>
                        <p className="text-sm text-gray-900">{selectedTicket.createdDate}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Select defaultValue={selectedTicket.assignedTo}>
                      <SelectTrigger className="border-gray-300">
                        <User className="h-4 w-4 mr-2 text-gray-500" />
                        <SelectValue placeholder="Assign to agent" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Unassigned">Unassigned</SelectItem>
                        <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                        <SelectItem value="Mike Chen">Mike Chen</SelectItem>
                        <SelectItem value="Emma Davis">Emma Davis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>

                <CardContent>
                  <ScrollArea className="h-[400px] mb-4 pr-4">
                    <div className="space-y-6">
                      {mockConversation.map((message) => (
                        <div
                          key={message.id}
                          className={`flex gap-3 ${
                            message.sender === 'agent' ? 'flex-row-reverse' : ''
                          }`}
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarFallback 
                              className={
                                message.sender === 'agent' 
                                  ? 'text-white' 
                                  : 'bg-gray-200 text-gray-700'
                              }
                              style={message.sender === 'agent' ? { backgroundColor: COLORS.primary } : {}}
                            >
                              {message.sender === 'agent' ? 'AG' : 'CS'}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`flex-1 ${message.sender === 'agent' ? 'text-right' : ''}`}>
                            <div className={`flex items-center gap-2 mb-1 ${message.sender === 'agent' ? 'flex-row-reverse' : ''}`}>
                              <span className="text-sm font-medium text-gray-900">{message.name}</span>
                              <span className="text-xs text-gray-500">{message.timestamp}</span>
                            </div>
                            <div
                              className={`inline-block p-4 rounded-2xl max-w-[80%] ${
                                message.sender === 'agent'
                                  ? 'text-white rounded-br-none'
                                  : 'bg-gray-100 text-gray-900 rounded-bl-none'
                              }`}
                              style={message.sender === 'agent' ? { backgroundColor: COLORS.primary } : {}}
                            >
                              <p className="text-sm leading-relaxed">{message.message}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="reply-message" className="text-gray-700 mb-2">Your Reply</Label>
                      <Textarea
                        id="reply-message"
                        placeholder="Type your reply to the customer..."
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        className="min-h-[120px] border-gray-300 focus:border-gray-400 resize-none"
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button 
                        className="flex-1"
                        style={{ backgroundColor: COLORS.primary }}
                        onClick={handleSendReply}
                        disabled={!replyMessage.trim()}
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Send Reply
                      </Button>
                      <Select defaultValue="open">
                        <SelectTrigger className="w-[180px] border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Keep Open</SelectItem>
                          <SelectItem value="pending">Mark Pending</SelectItem>
                          <SelectItem value="resolved">Mark Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex flex-col items-center justify-center h-[600px] text-center">
                <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Ticket Selected</h3>
                <p className="text-gray-500 mb-4">Select a ticket from the list to view the conversation</p>
                <Button 
                  variant="outline" 
                  className="border-gray-300"
                  onClick={() => setSelectedTicket(mockTickets[0])}
                >
                  View Sample Ticket
                </Button>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}